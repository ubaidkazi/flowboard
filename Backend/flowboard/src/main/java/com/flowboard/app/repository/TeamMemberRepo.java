package com.flowboard.app.repository;

import com.flowboard.app.entity.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TeamMemberRepo extends JpaRepository<TeamMember, Long>
{
    @Query("SELECT t FROM TeamMember t WHERE t.user.id = :id")
    TeamMember findByUserId(@Param("id") int id);

}