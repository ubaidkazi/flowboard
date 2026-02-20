package com.flowboard.app.websocket.events;

import com.flowboard.app.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardDeletedEvent
{

    private String type;
    private Long cardId;
    private int boardId;
    private int columnId;
    private int deletedBy;
    private Instant deletedAt;

}
