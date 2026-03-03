package com.flowboard.app.websocket.columnevents;

import com.flowboard.app.enums.EventType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ColumnDeletedEvent {

    private EventType type;
    private int columnId;
    private int boardId;
    private int deletedBy;
    private Instant deletedAt;


}
