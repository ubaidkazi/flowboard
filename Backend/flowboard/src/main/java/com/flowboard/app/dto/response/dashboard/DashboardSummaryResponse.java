package com.flowboard.app.dto.response.dashboard;


public record DashboardSummaryResponse(
        long totalProjects,
        long tasksDueToday,
        long completedTasksThisWeek,
        long completedTasksPreviousWeek,
        Double completedTasksTrend,
        boolean hasPreviousWeekData,
        long activeCollaborators
) {
}