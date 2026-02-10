package com.flowboard.app.websocket;

import com.flowboard.app.websocket.events.CardCreatedEvent;
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

}
