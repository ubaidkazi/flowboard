package com.flowboard.app.security;

import com.flowboard.app.enums.Role;
import com.flowboard.app.repository.ProjectMemberRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component("projectSecurity")
@RequiredArgsConstructor
public class ProjectSecurity {

    private final ProjectMemberRepo projectMemberRepo;

    public boolean canAccessProject(
            Long projectId,
            Authentication authentication
    ) {
        if (authentication == null
                || !authentication.isAuthenticated()) {
            return false;
        }

        String username = authentication.getName();

        return projectMemberRepo
                .existsByProject_IdAndUser_Username(
                        projectId,
                        username
                );
    }

    public boolean isProjectOwner(
            Long projectId,
            Authentication authentication
    ) {
        if (authentication == null
                || !authentication.isAuthenticated()) {
            return false;
        }

        String username = authentication.getName();

        return projectMemberRepo
                .existsByProject_IdAndUser_UsernameAndRole(
                        projectId,
                        username,
                        Role.OWNER
                );
    }
}