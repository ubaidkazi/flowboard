package com.flowboard.app.websocket.cardevents;

import com.flowboard.app.enums.EventType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardDeletedEvent
{

    private EventType type;
    private Long cardId;
    private int boardId;
    private int columnId;
    private int deletedBy;
    private Instant deletedAt;

}
