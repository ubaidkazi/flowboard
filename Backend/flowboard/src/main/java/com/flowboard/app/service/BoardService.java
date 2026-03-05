package com.flowboard.app.service;

import com.flowboard.app.dto.request.UpdateBoardRequest;
import com.flowboard.app.entity.*;
import com.flowboard.app.repository.*;
import com.flowboard.app.util.JsonUtils;
import com.flowboard.app.websocket.cardevents.CardMovedEvent;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

import static com.flowboard.app.enums.EventType.CARD_MOVED;

@Service
public class BoardService {

    @Autowired
    ProjectRepo projectRepo;
    @Autowired
    BoardRepo boardRepo;

    @Autowired
    TaskColumnRepo columnRepo;

    @Autowired
    CardRepo cardRepo;

    @Autowired
    UserService userService;

    @Autowired
    OutboxRepository outboxRepository;

    public ResponseEntity<Board> createBoard(Board board, Long projectId) {
        if (board.getColumns() != null) {
            for (TaskColumn column : board.getColumns()) {
                column.setBoard(board); // establish parent for column

                if (column.getCards() != null) {
                    for (Card card : column.getCards()) {
                        card.setColumn(column); // establish parent for card
                    }
                }
            }
        }
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        board.setProject(project);

        return new ResponseEntity<>(boardRepo.save(board), HttpStatus.OK);
    }

    public ResponseEntity<List<Board>> getBoardsByUserId(int userId) {
        List<Board> boards = boardRepo.findByUserId(userId);
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }


    public ResponseEntity<List<Board>> getBoardsByProjectId(Long projectId) {
        List<Board> boards = boardRepo.findByProjectId(projectId);
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }

    public ResponseEntity<Board> deleteBoard(int id) {
        try {
            Board board = boardRepo.findById(id).get();
            boardRepo.deleteById(id);
            return new ResponseEntity<>(board, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>((HttpHeaders) null, HttpStatus.NO_CONTENT);
        }
    }

    public Board getBoardById(int id) {
        try {
            Board board = boardRepo.findById(id).get();
            return sortBoardData(board);
        } catch (Exception e) {
            return null;
        }
    }

    public Board sortBoardData(Board board)
    {
        List<TaskColumn> columns = board.getColumns();

        List<TaskColumn> sortedColumns = columns.stream()
                .sorted(Comparator.comparingInt(TaskColumn::getPosition))
                .toList();

        for(TaskColumn column:sortedColumns)
        {
            List<Card> sortedCards = column.getCards().stream()
                    .sorted(Comparator.comparingInt(Card::getPosition))
                    .toList();

            column.setCards(sortedCards);

        }

        board.setColumns(sortedColumns);
        return board;
    }


    public void sortBoardDataReturnVoid(Board board) {

        // Sort columns IN PLACE
        board.getColumns()
                .sort(Comparator.comparingInt(TaskColumn::getPosition));

        for (TaskColumn column : board.getColumns()) {

            // Sort cards IN PLACE
            column.getCards()
                    .sort(Comparator.comparingInt(Card::getPosition));
        }
    }



//    @Transactional
//    public ResponseEntity<String> updateBoardPositions(UpdateBoardRequest request) {
//        Board oldBoard = boardRepo.findById(request.getBoardId())
//                .orElseThrow(() -> new RuntimeException("Board not found with id: " + request.getBoardId()));
//
//        Map<Long, TaskColumn> columnMap = new HashMap<>();
//
//        if (request.getUpdatedColumns() != null) {
//            List<TaskColumn> updatedColumns = new ArrayList<>();
//            for (UpdateColumnRequest newColumn : request.getUpdatedColumns()) {
//                TaskColumn column = columnRepo.findById(newColumn.getId())
//                        .orElseThrow(() -> new RuntimeException("Column not found: " + newColumn.getId()));
//                column.setPosition(newColumn.getPosition());
//                columnMap.put(column.getId(), column);
//                updatedColumns.add(column);
//            }
//            columnRepo.saveAll(updatedColumns);
//        }
//
//        if (request.getUpdatedCards() != null) {
//            List<Card> updatedCards = new ArrayList<>();
//            for (UpdateCardRequest newCard : request.getUpdatedCards()) {
//                Card card = cardRepo.findById(newCard.getId())
//                        .orElseThrow(() -> new RuntimeException("Card not found: " + newCard.getId()));
//
//
//                Long oldColumnId = card.getColumn().getId();
//                Integer oldPosition = card.getPosition();
//
//
//                TaskColumn parentColumn = columnMap.get(newCard.getColumnId());
//                if (parentColumn == null) {
//                    parentColumn = columnRepo.findById(newCard.getColumnId())
//                            .orElseThrow(() -> new RuntimeException("Column not found: " + newCard.getColumnId()));
//                }
//
//
//
//
//                card.setColumn(parentColumn);
//                card.setPosition(newCard.getPosition());
//                updatedCards.add(card);
//            }
//
//            cardRepo.saveAll(updatedCards);
//        }
//        boolean columnChanged = request.getNewColumn() == (request.getOldColumn());
//        int movedCardId = request.getCardMoved();
//        Card movedCard = cardRepo.findById(movedCardId).get();
//        Integer oldPosition = movedCard.getPosition();
//
//        boolean positionChanged = oldPosition == request.getNewPosition();
//
//        if (columnChanged || positionChanged) {
//            CardMovedEvent event = new CardMovedEvent(
//                    "CARD_MOVED",
//                    movedCard.getId(),
//                    request.getBoardId(),
//                    oldPosition,
//                    movedCard.getPosition(),
//                    userService.getCurrentUser().getId(),
//                    Instant.now()
//            );
//
//            boardEventPublisher.publishCardMoved(event);
//        }
//
//
//        return new ResponseEntity<>("okay", HttpStatus.OK);
//    }


    @Transactional
    public ResponseEntity<String> updateBoardPositions(UpdateBoardRequest request)
    {
        // Validate board exists (optional, but good practice)
        Board board = boardRepo.findById(request.getBoardId())
                .orElseThrow(() ->
                        new RuntimeException("Board not found with id: " + request.getBoardId()));

        // Validate card exists
        Card movedCard = cardRepo.findById(request.getCardMoved())
                .orElseThrow(() ->
                        new RuntimeException("Card not found with id: " + request.getCardMoved()));

        Integer oldPosition = movedCard.getPosition();
        Integer newPosition = request.getNewPosition();

        if (newPosition == null || newPosition < 0) {
            throw new IllegalArgumentException("Invalid new position");
        }

        TaskColumn oldColumn = movedCard.getColumn();

        // Validate new column exists
        TaskColumn newColumn = columnRepo.findById(request.getNewColumn())
                .orElseThrow(() ->
                        new RuntimeException("Column not found with id: " + request.getNewColumn()));

        boolean sameColumn = oldColumn.getId().equals(newColumn.getId());

        if (sameColumn) {

            // MOVING INSIDE SAME COLUMN
            for (Card card : oldColumn.getCards()) {

                if (card.getId().equals(movedCard.getId())) {
                    continue;
                }

                if (newPosition > oldPosition) {
                    // Moving DOWN
                    if (card.getPosition() > oldPosition &&
                            card.getPosition() <= newPosition) {

                        card.setPosition(card.getPosition() - 1);
                    }
                } else if (newPosition < oldPosition) {
                    // Moving UP
                    if (card.getPosition() >= newPosition &&
                            card.getPosition() < oldPosition) {

                        card.setPosition(card.getPosition() + 1);
                    }
                }
            }

        } else {

            // MOVING TO DIFFERENT COLUMN

            //Close gap in old column
            for (Card card : oldColumn.getCards()) {

                if (!card.getId().equals(movedCard.getId()) &&
                        card.getPosition() > oldPosition) {

                    card.setPosition(card.getPosition() - 1);
                }
            }

            //Create space in new column
            for (Card card : newColumn.getCards()) {

                if (card.getPosition() >= newPosition) {
                    card.setPosition(card.getPosition() + 1);
                }
            }

            movedCard.setColumn(newColumn);
        }

        // Set final position
        movedCard.setPosition(newPosition);

        // Save (other cards auto-persist because of @Transactional)
        cardRepo.save(movedCard);


        //card_moved so create and publish the event

        CardMovedEvent cardMovedEvent = new CardMovedEvent(
                CARD_MOVED,
                movedCard.getId(),
                request.getBoardId(),
                oldPosition,
                newPosition,
                newColumn.getId(),
                oldColumn.getId(),
                userService.getCurrentUser().getId(),
                Instant.now()
        );

        //Convert over event object into string to store in event outbox table
        String payload = JsonUtils.toJson(cardMovedEvent);

        OutboxEvent outboxEvent = new OutboxEvent();
        outboxEvent.setEventType("CARD_MOVED");
        outboxEvent.setTopic("/topic/boards/");
        outboxEvent.setDestinatonId(request.getBoardId());
        outboxEvent.setPayload(payload);
        outboxEvent.setCreatedAt(Instant.now());

        outboxRepository.save(outboxEvent);

        return ResponseEntity.ok("Card moved successfully");
    }




}

