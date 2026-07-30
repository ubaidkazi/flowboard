package com.flowboard.app.dto.response.dashboard;

import com.flowboard.app.enums.Role;

import java.time.Instant;
import java.time.LocalDateTime;

public record RecentProjectResponse(
        Long projectId,
        String name,
        String description,
        Role role,
        Instant lastActivityAt
) {
}