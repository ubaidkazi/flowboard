package com.flowboard.app.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.flowboard.app.websocket.cardevents.CardCreatedEvent;
import com.flowboard.app.websocket.cardevents.CardDeletedEvent;
import com.flowboard.app.websocket.cardevents.CardMovedEvent;
import com.flowboard.app.websocket.cardevents.CardUpdatedEvent;
import com.flowboard.app.websocket.columnevents.ColumnCreatedEvent;
import com.flowboard.app.websocket.columnevents.ColumnDeletedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;


@Service
@RequiredArgsConstructor
public class BoardEventPublisher {

    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper;


//    public BoardEventPublisher(SimpMessagingTemplate messagingTemplate) {
//        this.messagingTemplate = messagingTemplate;
//    }




    // ============= CARD EVENTS =================
    public void publishCardCreated(CardCreatedEvent event) {
        messagingTemplate.convertAndSend(
                "/topic/boards/" + event.getBoardId(),
                event
        );
    }


    public void publishCardDeleted(CardDeletedEvent event) {
        messagingTemplate.convertAndSend(
                "/topic/boards/" + event.getBoardId(),
                event
        );
    }


    public void publishCardUpdated(CardUpdatedEvent event) {
        messagingTemplate.convertAndSend(
                "/topic/boards/" + event.getBoardId(),
                event
        );
    }

    public void publishCardMoved(CardMovedEvent event) {
        //System.out.println("Sending event: " + event);
        messagingTemplate.convertAndSend(
                "/topic/boards/" + event.getBoardId(),
                event
        );
    }


    //======= COLUMN RELATED EVENTS ========================
    public void publishColumnCreated(ColumnCreatedEvent event){
        messagingTemplate.convertAndSend(
                "/topic/boards/" + event.getBoardId(),
                event
        );
    }

    public void publishColumnDeleted(ColumnDeletedEvent event){
        messagingTemplate.convertAndSend(
                "/topic/boards/" + event.getBoardId(),
                event
        );
    }


    //GENERIC PUBLISH METHOD
    public void publish(Integer destinatonId , Object event) {

            messagingTemplate.convertAndSend("/topic/boards/" + destinatonId , event);
            System.out.println("Sent to topic:" + destinatonId + "Payload" +event);

    }





}
