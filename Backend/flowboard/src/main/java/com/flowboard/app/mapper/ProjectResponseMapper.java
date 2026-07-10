package com.flowboard.app.mapper;

import com.flowboard.app.dto.response.ProjectMemberDTO;
import com.flowboard.app.dto.response.ProjectResponse;
import com.flowboard.app.entity.Project;
import jakarta.persistence.Column;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProjectResponseMapper {


    public ProjectResponse toDTO(Project project, String role) {

        List<ProjectMemberDTO> members = project.getMembers()
                .stream()
                .map(pm -> new ProjectMemberDTO(
                        pm.getUser().getId(),
                        pm.getUser().getFullName(),
                        pm.getUser().getUsername(),
                        pm.getUser().getEmail(),
                        pm.getRole()
                ))
                .toList();

        return new ProjectResponse(
                project.getId(),
                project.getName(),
                project.getDescription(),
                role,
                members
        );
    }

}
