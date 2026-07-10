package com.flowboard.app.repository;

import com.flowboard.app.dto.response.BoardCardDataResponse;
import com.flowboard.app.dto.response.ProjectResponse;
import com.flowboard.app.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BoardRepo extends JpaRepository<Board, Integer>
{

    List<Board> findByUserId(int userId);

    List<Board> findByProjectId(Long projectId);


    @Query("SELECT new com.flowboard.app.dto.response.BoardCardDataResponse(b.id, b.name) " +
            "FROM Board b WHERE b.project.id = :projectId")
    List<BoardCardDataResponse> getBoardCardData(@Param("projectId") Integer userId);



}
