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

    }