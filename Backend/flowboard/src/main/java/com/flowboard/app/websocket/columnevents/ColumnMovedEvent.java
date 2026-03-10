package com.flowboard.app.websocket.columnevents;

import com.flowboard.app.enums.EventType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ColumnMovedEvent
{

    private EventType type;
    private int boardId;
    private int columnId;
    private int oldPosition;
    private int newPosition;
    private int movedBy;
    private Instant movedAt;

}
