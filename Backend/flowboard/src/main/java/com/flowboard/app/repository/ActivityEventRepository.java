package com.flowboard.app.repository;

import com.flowboard.app.entity.ActivityEvent;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
}