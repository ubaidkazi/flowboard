package com.flowboard.app.repository;

import com.flowboard.app.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepo extends JpaRepository<Team, Long>
{

}