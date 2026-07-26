package com.flowboard.app.dto.response.dashboard;

import java.util.List;

public record DashboardResponse(
        DashboardSummaryResponse summary,
        List<DashboardTaskResponse> tasks,
        List<RecentActivityResponse> recentActivities,
        List<RecentProjectResponse> recentProjects)
{
}
