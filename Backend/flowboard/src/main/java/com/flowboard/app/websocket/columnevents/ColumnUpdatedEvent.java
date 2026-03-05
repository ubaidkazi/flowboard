package com.flowboard.app.websocket.columnevents;


import com.flowboard.app.enums.EventType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ColumnUpdatedEvent
{
    private EventType type;
    private int columnId;
    private int boardId;
    private String newTitle;
    private int position;
    private int updatedBy;
    private Instant updatedAt;


}
