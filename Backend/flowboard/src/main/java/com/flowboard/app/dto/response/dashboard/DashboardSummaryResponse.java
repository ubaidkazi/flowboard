package com.flowboard.app.dto.response.dashboard;


public record DashboardSummaryResponse(
        long totalProjects,
        long tasksDueToday,
        long completedTasks,
        long activeCollaborators
) {
}