package com.flowboard.app.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.flowboard.app.entity.Board;
import com.flowboard.app.entity.Card;
import com.flowboard.app.entity.OutboxEvent;
import com.flowboard.app.entity.TaskColumn;
import com.flowboard.app.repository.BoardRepo;
import com.flowboard.app.repository.OutboxRepository;
import com.flowboard.app.repository.TaskColumnRepo;
import com.flowboard.app.websocket.BoardEventPublisher;
import com.flowboard.app.websocket.columnevents.ColumnCreatedEvent;
import com.flowboard.app.websocket.columnevents.ColumnDeletedEvent;
import jakarta.persistence.Column;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;


import java.time.Instant;

import static com.flowboard.app.enums.EventType.COLUMN_CREATED;
import static com.flowboard.app.enums.EventType.COLUMN_DELETED;

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
    OutboxRepository outboxRepo;

    @Autowired
    private ObjectMapper objectMapper;


    @Autowired
    BoardEventPublisher eventPublisher;

    @Autowired
    OutboxPublisherService outboxPublisherService;

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

        eventPublisher.publishColumnCreated(event);

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
        String payload;
        try {
            payload = objectMapper.writeValueAsString(event);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to serialize ColumnDeletedEvent", e);
        }

        OutboxEvent outboxEvent = new OutboxEvent();
        outboxEvent.setEventType("COLUMN_DELETED");
        outboxEvent.setDestinatonId(boardId);
        outboxEvent.setPayload(payload);
        outboxEvent.setCreatedAt(Instant.now());

        outboxRepo.save(outboxEvent);

        return ResponseEntity.ok(column);
    }

}