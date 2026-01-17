package com.flowboard.app.repository;

import com.flowboard.app.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BoardRepo extends JpaRepository<Board, Integer>
{

    List<Board> findByUserId(int userId);

    List<Board> findByProjectId(Long projectId);


}
