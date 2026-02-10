package com.flowboard.app.service;

import com.flowboard.app.entity.Card;
import com.flowboard.app.entity.TaskColumn;
import com.flowboard.app.entity.User;
import com.flowboard.app.repository.CardRepo;
import com.flowboard.app.repository.TaskColumnRepo;
import com.flowboard.app.websocket.BoardEventPublisher;
import com.flowboard.app.websocket.events.CardCreatedEvent;
import com.flowboard.app.websocket.events.CardDeletedEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@Service
public class CardService {

    @Autowired
    BoardEventPublisher eventPublisher;


    @Autowired
    TaskColumnRepo taskColumnRepo;

    @Autowired
    CardRepo cardRepo;

    @Autowired
    UserService userService;



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
                "CARD_CREATED",
                savedCard.getId(),
                boardId,
                columnId,
                savedCard.getTitle(),
                savedCard.getPosition(),
                userService.getCurrentUser().getId(),
                Instant.now()
        );


        eventPublisher.publishCardCreated(event);







        return new ResponseEntity<>(card, HttpStatus.OK);
    }

    public ResponseEntity<Card> deleteCard(int boardId, int columnId, int cardId)
    {
        Card cardToDelete = cardRepo.findById(cardId).get();
        cardRepo.delete(cardToDelete);
        //normalizeCardPositions(columnId);

        CardDeletedEvent event = new CardDeletedEvent(
                "CARD_DELETED",
                cardToDelete.getId(),
                boardId,
                columnId,
                userService.getCurrentUser().getId(),
                Instant.now());

        eventPublisher.publishCardDeleted(event);

        return new ResponseEntity<>(cardToDelete, HttpStatus.OK);
    }


    //method to update card meta data
    public Card updatePartially(int id, Map<String, Object> updates) {
        Card card = cardRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Card not found"));

        // --- Handle checked <-> progress sync logic first ---
        if (updates.containsKey("checked")) {
            boolean newChecked = (boolean) updates.get("checked");
            card.setChecked(newChecked);
            if (newChecked) {
                card.setProgress("Completed");
            } else if ("Completed".equalsIgnoreCase(card.getProgress())) {
                // Choose your fallback here: "In Progress" or "Not Started"
                card.setProgress("In Progress");
            }
        }

        if (updates.containsKey("progress")) {
            String newProgress = (String) updates.get("progress");
            card.setProgress(newProgress);
            card.setChecked("Completed".equalsIgnoreCase(newProgress));
        }

        // --- Handle other independent fields ---
        if (updates.containsKey("priority"))
            card.setPriority((String) updates.get("priority"));

        if (updates.containsKey("description"))
            card.setDescription((String) updates.get("description"));

        if (updates.containsKey("dueDate") && updates.get("dueDate") != null)
            card.setDueDate(LocalDate.parse((String) updates.get("dueDate")));

        return cardRepo.save(card);
    }



    }