package com.flowboard.app.websocket.events;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardUpdatedEvent
{

    private String type;
    private int cardId;
    private long boardId;
    private int columnId;
    private int updatedBy;
    private Instant updatedAt;

    private String cardTitle;
    private String description;
    private String priority;
    private String progress;
    private LocalDate dueDate;
    private boolean checked;



}
