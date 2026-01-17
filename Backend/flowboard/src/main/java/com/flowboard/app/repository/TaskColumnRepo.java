package com.flowboard.app.repository;

import com.flowboard.app.entity.TaskColumn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface TaskColumnRepo extends JpaRepository<TaskColumn, Integer>
{
    @Query("SELECT COALESCE(MAX(c.position), -1) FROM TaskColumn c WHERE c.board.id = :boardId")
    int findMaxPositionByBoardId(@Param("boardId") int boardId);

}
