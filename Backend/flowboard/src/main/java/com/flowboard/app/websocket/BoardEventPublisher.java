package com.flowboard.app.websocket;

import com.flowboard.app.websocket.cardevents.CardCreatedEvent;
import com.flowboard.app.websocket.cardevents.CardDeletedEvent;
import com.flowboard.app.websocket.cardevents.CardMovedEvent;
import com.flowboard.app.websocket.cardevents.CardUpdatedEvent;
import com.flowboard.app.websocket.columnevents.ColumnCreatedEvent;
import jakarta.persistence.Column;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class BoardEventPublisher {

    private final SimpMessagingTemplate messagingTemplate;

    public BoardEventPublisher(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }




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


    //======= COLUMN LEVEL EVENTS ========================
    public void publishColumnCreated(ColumnCreatedEvent event){
        messagingTemplate.convertAndSend(
                "/topic/boards/" + event.getBoardId(),
                event
        );
    }



}
