package com.flowboard.app.dto.response.dashboard;

import java.time.LocalDateTime;

public record RecentActivityResponse(Long activityId,
                                     Long actorUserId,
                                     String actorName,
                                     String activityType,
                                     String actionText,
                                     String entityName,
                                     Long targetUserId,
                                     String targetUserName,
                                     Long projectId,
                                     Long boardId,
                                     Long cardId,
                                     LocalDateTime occurredAt
) {
}
