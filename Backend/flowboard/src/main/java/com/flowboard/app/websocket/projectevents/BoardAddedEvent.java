package com.flowboard.app.websocket.projectevents;

import com.flowboard.app.enums.EventType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardAddedEvent
{
    private EventType type;
    private String title;
    private String desc;
    private int createdBy;
    private Instant createdAt;


}