package com.flowboard.app.controller;



import com.flowboard.app.entity.Card;
import com.flowboard.app.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CardController
{
    @Autowired
    CardService cardService;
    //private final SimpMessagingTemplate messagingTemplate;

//    public CardController(CardService cardService, SimpMessagingTemplate messagingTemplate) {
//        this.cardService = cardService;
//        //this.messagingTemplate = messagingTemplate;
//    }


    // add/create a card inside a task column
    @PostMapping("/board/card/{boardId}/{colId}")
    public ResponseEntity<Card> createCard(@RequestBody Card card, @PathVariable int boardId, @PathVariable int colId)
    {
        return cardService.addCard(card, boardId, colId);
    }




    //Delete a card endpoint
    @DeleteMapping("/board/{boardId}/{columnId}/{cardId}")
    public ResponseEntity<Card> deleteCard(@PathVariable int boardId, @PathVariable int columnId, @PathVariable int cardId )
    {
        return cardService.deleteCard(boardId, columnId, cardId);
    }


    //endpoint to update card meta data such as data, priority, status
    @PatchMapping("/cards/{id}")
    public ResponseEntity<Card> updateCardPartially(
            @PathVariable int id,
            @RequestBody Map<String, Object> updates) {

        Card updatedCard = cardService.updatePartially(id, updates);

        return ResponseEntity.ok(updatedCard);
    }











}
