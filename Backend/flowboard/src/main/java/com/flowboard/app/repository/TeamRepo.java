package com.flowboard.app.repository;

import com.flowboard.app.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TeamRepo extends JpaRepository<Team, Long>
{
    @Query("SELECT t FROM Team t WHERE t.owner.id = :id")
    List<Team> findByOwnerId(@Param("id") int id);

}