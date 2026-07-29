package com.flowboard.app.dto.response.dashboard;


public record DashboardSummaryResponse(
        long totalProjects,
        long tasksDueToday,
        long completedTasksThisWeek,
        Double completedTasksTrend,
        long activeCollaborators
) {
}