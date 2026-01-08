package com.flowboard.app.repository;

import com.flowboard.app.entity.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectMemberRepo extends JpaRepository<ProjectMember, Long>
{

}