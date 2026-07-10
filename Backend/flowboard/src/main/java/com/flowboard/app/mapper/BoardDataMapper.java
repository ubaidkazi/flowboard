package com.flowboard.app.mapper;

import com.flowboard.app.dto.response.BoardDataResponseDTO;
import com.flowboard.app.dto.response.ProjectMemberDTO;
import com.flowboard.app.entity.Board;
import com.flowboard.app.entity.ProjectMember;
import org.springframework.stereotype.Component;

@Component
public class BoardDataMapper {

    public BoardDataResponseDTO toDTO(Board board) {

        if (board == null) {
            return null;
        }

        BoardDataResponseDTO dto = new BoardDataResponseDTO();

        dto.setId(board.getId());
        dto.setName(board.getName());

        // or board.getColumns().size()
        dto.setColumnCount(board.getColumns() == null ? 0 : board.getColumns().size());

        dto.setMembers(
                board.getProject().getMembers()
                        .stream()
                        .map(this::toProjectMemberDTO)
                        .toList()
        );

        return dto;
    }

    private ProjectMemberDTO toProjectMemberDTO(ProjectMember member) {

        ProjectMemberDTO dto = new ProjectMemberDTO();

        dto.setId(member.getUser().getId());
        dto.setFullName(member.getUser().getFullName());
        dto.setEmail(member.getUser().getEmail());
        dto.setUsername(member.getUser().getUsername());
        dto.setRole(member.getRole());

        return dto;
    }
}