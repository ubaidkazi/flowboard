package com.flowboard.app.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

//used for the board page data


@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardResponseDTO
{
    private long id;
    private String title;
    private long projectId;
    private UserResponseDTO owner;
    private List<ColumnDTO> columns;
}
