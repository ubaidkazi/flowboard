package com.flowboard.app.service;

import com.flowboard.app.entity.Card;
import com.flowboard.app.entity.TaskColumn;
import com.flowboard.app.repository.CardRepo;
import com.flowboard.app.repository.TaskColumnRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@Service
public class CardService {


    @Autowired
    TaskColumnRepo taskColumnRepo;

    @Autowired
    CardRepo cardRepo;



    public ResponseEntity<Card> addCard(Card card, int boardId, int columnId)
    {
        TaskColumn column =taskColumnRepo.findById(columnId).get();
        card.setColumn(column);
        card.setCreatedAt(LocalDateTime.now());
        card.setUpdatedAt(LocalDateTime.now());
        int newPosition = cardRepo.findMaxPositionByListId(columnId) + 1;
        card.setPosition(newPosition);

        cardRepo.save(card);
        return new ResponseEntity<>(card, HttpStatus.OK);
    }

    public ResponseEntity<Card> deleteCard(int boardId, int columnId, int cardId)
    {
        Card card = cardRepo.findById(cardId).get();
        cardRepo.delete(card);
        //normalizeCardPositions(columnId);

        return new ResponseEntity<>(card, HttpStatus.OK);
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