package com.flowboard.app.websocket;

import com.flowboard.app.websocket.events.CardCreatedEvent;
import com.flowboard.app.websocket.events.CardDeletedEvent;
import com.flowboard.app.websocket.events.CardUpdatedEvent;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class BoardEventPublisher {

    private final SimpMessagingTemplate messagingTemplate;

    public BoardEventPublisher(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

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



}
