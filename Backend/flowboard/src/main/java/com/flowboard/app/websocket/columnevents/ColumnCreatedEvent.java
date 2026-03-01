package com.flowboard.app.websocket.columnevents;


import com.flowboard.app.enums.EventType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ColumnCreatedEvent
{
    private EventType type;
    private Long columnId;
    private int boardId;
    private String title;
    private int position;
    private int createdBy;
    private Instant createdAt;


}
