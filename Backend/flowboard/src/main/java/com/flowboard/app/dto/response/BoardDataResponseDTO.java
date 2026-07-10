package com.flowboard.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardDataResponseDTO {

    private Long id;
    private String name;
    private int columnCount;
    private List<ProjectMemberDTO> members;
}
