package com.flowboard.app.repository;

import com.flowboard.app.entity.TaskColumn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface TaskColumnRepo extends JpaRepository<TaskColumn, Integer>
{
    @Query("SELECT COALESCE(MAX(c.position), -1) FROM TaskColumn c WHERE c.board.id = :boardId")
    int findMaxPositionByBoardId(@Param("boardId") int boardId);


    @Modifying
    @Query("""
    UPDATE TaskColumn c
    SET c.position = c.position - 1
    WHERE c.board.id = :boardId
    AND c.position > :oldPos
    AND c.position <= :newPos
    """)
    void shiftLeft(int boardId, int oldPos, int newPos);



    @Modifying
    @Query("""
    UPDATE TaskColumn c
    SET c.position = c.position +1
    WHERE c.board.id = :boardId
    AND c.position >= :newPos
    AND c.position < :oldPos
    """)
    void shiftRight(int boardId, int oldPos, int newPos);


    @Modifying
    @Query("""
    UPDATE TaskColumn c
    SET c.position = :newPos
    WHERE c.id = :columnId
    """)
    void updateColumnPosition(int columnId, int newPos);




}
