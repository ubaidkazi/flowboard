package com.flowboard.app.websocket.cardevents;

import com.flowboard.app.enums.EventType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardMovedEvent
{

    private EventType type;
    private Long cardId;
    private int boardId;
    private int oldPosition;
    private int newPosition;
    private Long newColumn;
    private Long oldColumn;
    private int movedBy;
    private Instant movedAt;

}
