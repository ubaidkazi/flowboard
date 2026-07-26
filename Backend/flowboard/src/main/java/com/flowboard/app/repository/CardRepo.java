package com.flowboard.app.repository;

import com.flowboard.app.entity.Card;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface CardRepo extends JpaRepository<Card, Integer>
{

    @Query("SELECT COALESCE(Max(c.position), -1) FROM Card c WHERE c.column.id = :columnId ")
    int findMaxPositionByListId(@Param("columnId")   int columnId);


    @Query("""
    SELECT COUNT(DISTINCT c.id)
    FROM Card c
    JOIN c.assignedMembers member
    WHERE member.id = :userId
      AND c.dueDate = :today
      AND c.checked = false
    """)
    long countTasksDueToday(
            @Param("userId") Long userId,
            @Param("today") LocalDate today
    );

    @Query("""
    SELECT COUNT(DISTINCT c.id)
    FROM Card c
    JOIN c.assignedMembers member
    WHERE member.id = :userId
      AND c.checked = true
    """)
    long countCompletedTasksForUser(
            @Param("userId") Long userId
    );



    @Query("""
    SELECT DISTINCT c
    FROM Card c
    JOIN c.assignedMembers member
    WHERE member.id = :userId
      AND c.checked = false
      AND (
            c.dueDate IS NULL
            OR c.dueDate <= :weekEnd
          )
    ORDER BY
        CASE
            WHEN c.dueDate < :today THEN 0
            WHEN c.dueDate = :today THEN 1
            WHEN c.dueDate IS NOT NULL THEN 2
            ELSE 3
        END,
        c.dueDate ASC,
        c.updatedAt DESC
    """)
    List<Card> findDashboardTasksForUser(
            @Param("userId") Long userId,
            @Param("today") LocalDate today,
            @Param("weekEnd") LocalDate weekEnd,
            Pageable pageable
    );




}