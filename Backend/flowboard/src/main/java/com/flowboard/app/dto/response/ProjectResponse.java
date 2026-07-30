package com.flowboard.app.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectResponse
{
    private Long id;
    private String name;
    private String description;
    private String role;
    private Instant lastActivityAt;

    private List<ProjectMemberDTO> projectMembers;


}