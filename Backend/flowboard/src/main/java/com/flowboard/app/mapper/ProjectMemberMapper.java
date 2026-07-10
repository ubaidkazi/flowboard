package com.flowboard.app.mapper;


import com.flowboard.app.dto.response.BoardMemberDataResponse;
import com.flowboard.app.dto.response.ProjectMemberDTO;
import com.flowboard.app.dto.response.UserResponseDTO;
import com.flowboard.app.entity.ProjectMember;
import com.flowboard.app.entity.User;
import org.springframework.stereotype.Component;

@Component
public class ProjectMemberMapper {


    public ProjectMemberDTO toDTO(ProjectMember member) {
        return new ProjectMemberDTO(
                member.getUser().getId(),
                member.getUser().getFullName(),
                member.getUser().getUsername(),
                member.getUser().getEmail(),
                member.getRole()
        );
    }

}
