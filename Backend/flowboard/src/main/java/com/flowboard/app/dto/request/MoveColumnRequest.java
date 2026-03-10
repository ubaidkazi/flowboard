package com.flowboard.app.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class MoveColumnRequest
{
    private Integer boardId;
    private Integer columnMoved;
    private Integer oldPosition;
    private Integer newPosition;

}
