package com.flowboard.app.repository;

import com.flowboard.app.entity.ActivityEvent;
import com.flowboard.app.enums.ActivityType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

public interface ActivityEventRepository
        extends JpaRepository<ActivityEvent, Long> {

    @Query("""
        SELECT activity
        FROM ActivityEvent activity
        WHERE activity.projectId IN (
            SELECT project.id
            FROM Project project
            JOIN project.members membership
            WHERE membership.user.id = :userId
        )
        ORDER BY activity.occurredAt DESC
    """)
    List<ActivityEvent> findRecentActivityForUser(
            @Param("userId") Long userId,
            Pageable pageable
    );



    @Query("""
    SELECT activity
    FROM ActivityEvent activity
    WHERE activity.projectId = :projectId
    ORDER BY activity.occurredAt DESC
""")
    List<ActivityEvent> findRecentActivityByProjectId(
            @Param("projectId") Long projectId,
            Pageable pageable
    );





    @Query("""
    SELECT COUNT(DISTINCT activity.cardId)
    FROM ActivityEvent activity
    JOIN activity.affectedUsers affectedUser
    WHERE activity.type = :type
      AND affectedUser.userId = :userId
      AND activity.occurredAt >= :start
      AND activity.occurredAt < :end
""")
    long countCompletedCardsForUserBetween(
            @Param("userId") Long userId,
            @Param("type") ActivityType type,
            @Param("start") Instant start,
            @Param("end") Instant end
    );

}