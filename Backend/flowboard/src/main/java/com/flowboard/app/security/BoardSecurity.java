package com.flowboard.app.security;

import com.flowboard.app.enums.Role;
import com.flowboard.app.repository.BoardRepo;
import com.flowboard.app.repository.ProjectMemberRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component("boardSecurity")
@RequiredArgsConstructor
public class BoardSecurity {

    private final BoardRepo boardRepo;
    private final ProjectMemberRepo projectMemberRepo;

    public boolean canAccessBoard(
            Integer boardId,
            Authentication authentication
    ) {
        if (authentication == null
                || !authentication.isAuthenticated()) {
            return false;
        }

        String username = authentication.getName();

        return boardRepo.findById(boardId)
                .map(board ->
                        projectMemberRepo
                                .existsByProject_IdAndUser_Username(
                                        board.getProject().getId(),
                                        username
                                )
                )
                .orElse(false);
    }

    public boolean canManageBoard(
            Integer boardId,
            Authentication authentication
    ) {
        if (authentication == null
                || !authentication.isAuthenticated()) {
            return false;
        }

        String username = authentication.getName();

        return boardRepo.findById(boardId)
                .map(board ->
                        projectMemberRepo
                                .existsByProject_IdAndUser_Username(
                                        board.getProject().getId(),
                                        username
                                )
                )
                .orElse(false);
    }


    public boolean isProjectOwnerForBoard(
            Integer boardId,
            Authentication authentication
    ) {
        if (authentication == null
                || !authentication.isAuthenticated()) {
            return false;
        }

        String username = authentication.getName();

        return boardRepo.findById(boardId)
                .map(board ->
                        projectMemberRepo
                                .existsByProject_IdAndUser_UsernameAndRole(
                                        board.getProject().getId(),
                                        username,
                                        Role.OWNER
                                )
                )
                .orElse(false);
    }

}