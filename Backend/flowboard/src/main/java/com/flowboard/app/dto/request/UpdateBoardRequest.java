package com.flowboard.app.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateBoardRequest
{
    private Integer boardId;
    private Integer cardMoved;
    private Integer oldColumn;
    private Integer newColumn;
    private Integer newPosition;



}
