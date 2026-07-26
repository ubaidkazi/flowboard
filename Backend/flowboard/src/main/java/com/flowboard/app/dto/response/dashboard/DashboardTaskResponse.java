package com.flowboard.app.dto.response.dashboard;

import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.List;

public record DashboardTaskResponse(
        Long cardId,
        String title,
        String description,
        String priority,
        String progress,
        LocalDate dueDate,
        String dueStatus,
        List<TaskAssigneeResponse> assignees
//        Long columnId,
//        String columnName,
//        Long boardId,
//        String boardName,
//        Long projectId,
//        String projectName
) {

}
