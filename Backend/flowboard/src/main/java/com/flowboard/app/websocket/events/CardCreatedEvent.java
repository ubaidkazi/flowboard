package com.flowboard.app.websocket.events;

import com.flowboard.app.enums.EventType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardCreatedEvent
{

    private EventType type;
    private Long cardId;
    private int boardId;
    private int columnId;
    private String title;
    private int position;
    private int createdBy;
    private Instant createdAt;

}
