package com.flowboard.app.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class MoveCardRequest
{
    private Integer boardId;
    private Integer cardMoved;
    private Integer oldColumn;
    private Integer newColumn;
    private Integer newPosition;



}
