package com.flowboard.app.repository;

import com.flowboard.app.entity.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamMemberRepo extends JpaRepository<TeamMember, Long>
{

}