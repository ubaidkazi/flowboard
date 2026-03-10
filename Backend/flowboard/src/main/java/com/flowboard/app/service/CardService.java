package com.flowboard.app.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flowboard.app.dto.request.MoveCardRequest;
import com.flowboard.app.entity.Board;
import com.flowboard.app.entity.Card;
import com.flowboard.app.entity.OutboxEvent;
import com.flowboard.app.entity.TaskColumn;
import com.flowboard.app.repository.BoardRepo;
import com.flowboard.app.repository.CardRepo;
import com.flowboard.app.repository.OutboxRepository;
import com.flowboard.app.repository.TaskColumnRepo;
import com.flowboard.app.util.JsonUtils;
import com.flowboard.app.websocket.BoardEventPublisher;
import com.flowboard.app.websocket.cardevents.CardCreatedEvent;
import com.flowboard.app.websocket.cardevents.CardDeletedEvent;
import com.flowboard.app.websocket.cardevents.CardMovedEvent;
import com.flowboard.app.websocket.cardevents.CardUpdatedEvent;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

import static com.flowboard.app.enums.EventType.*;


@Service
public class CardService {

    @Autowired
    BoardEventPublisher eventPublisher;


    @Autowired
    BoardRepo boardRepo;

    @Autowired
    TaskColumnRepo taskColumnRepo;

    @Autowired
    CardRepo cardRepo;

    @Autowired
    UserService userService;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    OutboxRepository outboxRepository;



    public ResponseEntity<Card> addCard(Card card, int boardId, int columnId)
    {
        TaskColumn column =taskColumnRepo.findById(columnId).get();
        card.setColumn(column);
        card.setCreatedAt(LocalDateTime.now());
        card.setUpdatedAt(LocalDateTime.now());
        int newPosition = cardRepo.findMaxPositionByListId(columnId) + 1;
        card.setPosition(newPosition);

        Card savedCard = cardRepo.save(card);

        //create new card added event
        CardCreatedEvent event = new CardCreatedEvent(
                CARD_CREATED,
                savedCard.getId(),
                boardId,
                columnId,
                savedCard.getTitle(),
                savedCard.getPosition(),
                userService.getCurrentUser().getId(),
                Instant.now()
        );

        //convert our event object into a json string and store in the DB
        String payload = JsonUtils.toJson(event);

        OutboxEvent outboxEvent = new OutboxEvent();
        outboxEvent.setEventType("CARD_CREATED");
        outboxEvent.setTopic("/topic/boards/");
        outboxEvent.setDestinatonId(boardId);
        outboxEvent.setPayload(payload);
        outboxEvent.setCreatedAt(Instant.now());

        outboxRepository.save(outboxEvent);

        return new ResponseEntity<>(card, HttpStatus.OK);
    }

    public ResponseEntity<Card> deleteCard(int boardId, int columnId, int cardId)
    {
        Card cardToDelete = cardRepo.findById(cardId).get();
        cardRepo.delete(cardToDelete);
        //normalizeCardPositions(columnId);

        CardDeletedEvent event = new CardDeletedEvent(
                CARD_DELETED,
                cardToDelete.getId(),
                boardId,
                columnId,
                userService.getCurrentUser().getId(),
                Instant.now());

        //convert our event object into a json string and store in the DB
        String payload = JsonUtils.toJson(event);

        OutboxEvent outboxEvent = new OutboxEvent();
        outboxEvent.setEventType("CARD_DELETED");
        outboxEvent.setTopic("/topic/boards/");
        outboxEvent.setDestinatonId(boardId);
        outboxEvent.setPayload(payload);
        outboxEvent.setCreatedAt(Instant.now());

        outboxRepository.save(outboxEvent);

        return new ResponseEntity<>(cardToDelete, HttpStatus.OK);
    }


//    //method to update card meta data
//    public Card updatePartially(int id, Map<String, Object> updates) {
//        Card card = cardRepo.findById(id)
//                .orElseThrow(() -> new RuntimeException("Card not found"));
//
//        // --- Handle checked <-> progress sync logic first ---
//        if (updates.containsKey("checked")) {
//            boolean newChecked = (boolean) updates.get("checked");
//            card.setChecked(newChecked);
//            if (newChecked) {
//                card.setProgress("Completed");
//            } else if ("Completed".equalsIgnoreCase(card.getProgress())) {
//                // Choose your fallback here: "In Progress" or "Not Started"
//                card.setProgress("In Progress");
//            }
//        }
//
//        if (updates.containsKey("progress")) {
//            String newProgress = (String) updates.get("progress");
//            card.setProgress(newProgress);
//            card.setChecked("Completed".equalsIgnoreCase(newProgress));
//        }
//
//        // --- Handle other independent fields ---
//        if (updates.containsKey("priority"))
//            card.setPriority((String) updates.get("priority"));
//
//        if (updates.containsKey("title")){
//            String newTitle = (String) updates.get("title");
//
//            if (!newTitle.equalsIgnoreCase(""))
//            {
//                card.setTitle(newTitle);
//            }
//            //card.setTitle((String) updates.get("title"));
//
//
//        }
//
//
//        if (updates.containsKey("description"))
//            card.setDescription((String) updates.get("description"));
//
//        if (updates.containsKey("dueDate") && updates.get("dueDate") != null)
//            card.setDueDate(LocalDate.parse((String) updates.get("dueDate")));
//
//        card.setUpdatedAt(LocalDateTime.now());
//        Card updatedCard = cardRepo.save(card);
//
//        int boardId = (int) updatedCard.getColumn().getBoard().getId();
//
//        CardUpdatedEvent event = new CardUpdatedEvent(
//                CARD_UPDATED,
//                id,
//                updatedCard.getColumn().getBoard().getId(),
//                updatedCard.getColumn().getId().intValue(),
//                userService.getCurrentUser().getId(),
//                Instant.now(),
//                updatedCard.getTitle(),
//                updatedCard.getDescription(),
//                updatedCard.getPriority(),
//                updatedCard.getProgress(),
//                updatedCard.getDueDate(),
//                updatedCard.isChecked()
//
//        );
//
//        //convert our event object into a json string and store in the DB
//        String payload = JsonUtils.toJson(event);
//
//        OutboxEvent outboxEvent = new OutboxEvent();
//        outboxEvent.setEventType("CARD_UPDATED");
//        outboxEvent.setTopic("/topic/boards/");
//        outboxEvent.setDestinatonId(boardId);
//        outboxEvent.setPayload(payload);
//        outboxEvent.setCreatedAt(Instant.now());
//
//        outboxRepository.save(outboxEvent);
//
//
//        return updatedCard;
//    }

    @Transactional
    public Card updatePartially(int id, Map<String, Object> updates) {
        Card card = cardRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Card not found"));

        // --- Handle progress (single source of truth) ---
        if (updates.containsKey("progress")) {
            String newProgress = (String) updates.get("progress");
            if (newProgress != null && !newProgress.isBlank()) {
                card.setProgress(newProgress);
                // Derive checked from progress
                card.setChecked("Completed".equalsIgnoreCase(newProgress));
            }
        }

        // --- Handle other independent fields ---
        if (updates.containsKey("priority")) {
            String newPriority = (String) updates.get("priority");
            if (newPriority != null && !newPriority.isBlank()) {
                card.setPriority(newPriority);
            }
        }

        if (updates.containsKey("title")) {
            String newTitle = (String) updates.get("title");
            if (newTitle != null && !newTitle.isBlank()) {
                card.setTitle(newTitle);
            }
        }

        if (updates.containsKey("description")) {
            String newDescription = (String) updates.get("description");
            if (newDescription != null) {
                card.setDescription(newDescription);
            }
        }

        if (updates.containsKey("dueDate") && updates.get("dueDate") != null) {
            card.setDueDate(LocalDate.parse((String) updates.get("dueDate")));
        }

        card.setUpdatedAt(LocalDateTime.now());
        Card updatedCard = cardRepo.save(card);

        // --- Emit event ---
        int boardId = (int) updatedCard.getColumn().getBoard().getId();
        CardUpdatedEvent event = new CardUpdatedEvent(
                CARD_UPDATED,
                id,
                updatedCard.getColumn().getBoard().getId(),
                updatedCard.getColumn().getId().intValue(),
                userService.getCurrentUser().getId(),
                Instant.now(),
                updatedCard.getTitle(),
                updatedCard.getDescription(),
                updatedCard.getPriority(),
                updatedCard.getProgress(),
                updatedCard.getDueDate(),
                updatedCard.isChecked()
        );

        String payload = JsonUtils.toJson(event);

        OutboxEvent outboxEvent = new OutboxEvent();
        outboxEvent.setEventType("CARD_UPDATED");
        outboxEvent.setTopic("/topic/boards/");
        outboxEvent.setDestinatonId(boardId);
        outboxEvent.setPayload(payload);
        outboxEvent.setCreatedAt(Instant.now());

        outboxRepository.save(outboxEvent);

        return updatedCard;
    }



    @Transactional
    public ResponseEntity<String> moveCard(MoveCardRequest request)
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
        TaskColumn newColumn = taskColumnRepo.findById(request.getNewColumn())
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