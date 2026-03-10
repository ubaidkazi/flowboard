package com.flowboard.app.service;

import com.flowboard.app.dto.request.MoveColumnRequest;
import com.flowboard.app.entity.Board;
import com.flowboard.app.entity.Card;
import com.flowboard.app.entity.OutboxEvent;
import com.flowboard.app.entity.TaskColumn;
import com.flowboard.app.repository.BoardRepo;
import com.flowboard.app.repository.OutboxRepository;
import com.flowboard.app.repository.TaskColumnRepo;
import com.flowboard.app.util.JsonUtils;
import com.flowboard.app.websocket.BoardEventPublisher;
import com.flowboard.app.websocket.columnevents.ColumnCreatedEvent;
import com.flowboard.app.websocket.columnevents.ColumnDeletedEvent;
import com.flowboard.app.websocket.columnevents.ColumnMovedEvent;
import com.flowboard.app.websocket.columnevents.ColumnUpdatedEvent;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.time.Instant;

import static com.flowboard.app.enums.EventType.*;

@Service
public class TaskColumnService
{
    @Autowired
    BoardRepo boardRepo;

    @Autowired
    TaskColumnRepo columnRepo;

    @Autowired
    UserService userService;

    @Autowired
    OutboxRepository outboxRepository;


    @Autowired
    BoardEventPublisher eventPublisher;


    public ResponseEntity<TaskColumn> createColumn(TaskColumn column, int boardId)
    {

        Board board = boardRepo.findById(boardId).get();
        column.setBoard(board);

        try
        {
            // Link cards to the column
            if (column.getCards() != null) {
                for (Card card : column.getCards()) {
                    card.setColumn(column);
                }
            }
        }
        catch (Exception e)
        {
            System.out.println(e + "Exception thrown");
        }
        int newPosition = columnRepo.findMaxPositionByBoardId(boardId) + 1;
        column.setPosition(newPosition);

        TaskColumn newColumn = columnRepo.save(column);

        //create and publish the event
        ColumnCreatedEvent event = new ColumnCreatedEvent(
                COLUMN_CREATED,
                newColumn.getId(),
                boardId,
                newColumn.getName(),
                newColumn.getPosition(),
                userService.getCurrentUser().getId(),
                Instant.now()

        );

        //convert our event object into a json string and store in the DB
        String payload = JsonUtils.toJson(event);

        OutboxEvent outboxEvent = new OutboxEvent();
        outboxEvent.setEventType("COLUMN_CREATED");
        outboxEvent.setTopic("/topic/boards/");
        outboxEvent.setDestinatonId(boardId);
        outboxEvent.setPayload(payload);
        outboxEvent.setCreatedAt(Instant.now());

        outboxRepository.save(outboxEvent);

        return new ResponseEntity<TaskColumn>(column, HttpStatus.OK);
    }


//    public ResponseEntity<TaskColumn> deleteColumn(int boardId, int columnId)
//    {
//        TaskColumn columnToDelete = columnRepo.findById(columnId).get();
//        columnRepo.delete(columnToDelete);
//        //NormalizeColumnPositions(boardId);
//
//
//
//        //create and publish the event
//        ColumnDeletedEvent event = new ColumnDeletedEvent(
//                COLUMN_DELETED,
//                columnId,
//                boardId,
//                userService.getCurrentUser().getId(),
//                Instant.now()
//        );
//
//        eventPublisher.publishColumnDeleted(event);
//
//        return new ResponseEntity<>(columnToDelete, HttpStatus.OK);
//    }


    public ResponseEntity<TaskColumn> deleteColumn(int boardId, int columnId) {

        TaskColumn column = columnRepo.findById(columnId)
                .orElseThrow(() -> new RuntimeException("Column not found"));

        columnRepo.delete(column);

        ColumnDeletedEvent event = new ColumnDeletedEvent(
                COLUMN_DELETED,
                columnId,
                boardId,
                userService.getCurrentUser().getId(),
                Instant.now()
        );

        //convert our event object into a json string and store in the DB
        String payload = JsonUtils.toJson(event);

        OutboxEvent outboxEvent = new OutboxEvent();
        outboxEvent.setEventType("COLUMN_DELETED");
        outboxEvent.setTopic("/topic/boards/");
        outboxEvent.setDestinatonId(boardId);
        outboxEvent.setPayload(payload);
        outboxEvent.setCreatedAt(Instant.now());

        outboxRepository.save(outboxEvent);

        return ResponseEntity.ok(column);
    }

    public ResponseEntity<TaskColumn> updateColumnName(int columnId, String newTitle)
    {
        TaskColumn column = columnRepo.findById(columnId)
                .orElseThrow(() -> new RuntimeException("Column not found"));

        column.setName(newTitle);

        columnRepo.save(column);

        int boardId = (int) column.getBoard().getId();

        ColumnUpdatedEvent event = new ColumnUpdatedEvent(
                COLUMN_UPDATED,
                columnId,
                boardId,
                newTitle,
                column.getPosition(),
                userService.getCurrentUser().getId(),
                Instant.now()
        );

        //convert event into a JSON string to store
        String payload = JsonUtils.toJson(event);

        //create and store event in outbox table
        OutboxEvent outboxEvent = new OutboxEvent();
        outboxEvent.setEventType("COLUMN_UPDATED");
        outboxEvent.setTopic("/topic/boards/");
        outboxEvent.setDestinatonId(boardId);
        outboxEvent.setPayload(payload);
        outboxEvent.setCreatedAt(Instant.now());

        outboxRepository.save(outboxEvent);








        return ResponseEntity.ok(column);


    }


    @Transactional
    public ResponseEntity<String> moveColumn(MoveColumnRequest request) {

        int boardId = request.getBoardId();
        int columnId = request.getColumnMoved();
        int oldPosition = request.getOldPosition();
        int newPosition = request.getNewPosition();


        String response = "null";

        //col moving left, position will shift toward right
        if ( oldPosition > newPosition)
        {
            response = "moving left!!";
            columnRepo.shiftRight(boardId, oldPosition, newPosition);
        }
        //col moving right, position will shift toward left
        else if(newPosition > oldPosition)
        {
            response = "moving right";
            columnRepo.shiftLeft(boardId, oldPosition, newPosition);
        }

        columnRepo.updateColumnPosition(columnId, newPosition);

        //return ResponseEntity.ok("Data: " +  request.getBoardId() + "  " + request.getColumnMoved() + "  " + request.getNewPosition());
        System.out.println(response);


        ColumnMovedEvent event = new ColumnMovedEvent(
                COLUMN_MOVED,
                columnId,
                boardId,
                oldPosition,
                newPosition,
                userService.getCurrentUser().getId(),
                Instant.now()
        );

        //convert event into a JSON string to store
        String payload = JsonUtils.toJson(event);

        //create and store event in outbox table
        OutboxEvent outboxEvent = new OutboxEvent();
        outboxEvent.setEventType("COLUMN_MOVED");
        outboxEvent.setTopic("/topic/boards/");
        outboxEvent.setDestinatonId(boardId);
        outboxEvent.setPayload(payload);
        outboxEvent.setCreatedAt(Instant.now());

        outboxRepository.save(outboxEvent);














        return ResponseEntity.ok(response);
    }
}