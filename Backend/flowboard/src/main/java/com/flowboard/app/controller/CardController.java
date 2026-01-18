package com.flowboard.app.controller;



import com.flowboard.app.entity.Card;
import com.flowboard.app.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


    //col controller
    @PostMapping("/board/card/{boardId}/{colId}")
    public ResponseEntity<Card> createColumn(@RequestBody Card card, @PathVariable int boardId, @PathVariable int colId)
    {
        return cardService.addCard(card, boardId, colId);
    }




    //card controller
    @DeleteMapping("/board/{boardId}/{columnId}/{cardId}")
    public ResponseEntity<Card> deleteCard(@PathVariable int boardId, @PathVariable int columnId, @PathVariable int cardId )
    {
        return cardService.deleteCard(boardId, columnId, cardId);
    }



}
