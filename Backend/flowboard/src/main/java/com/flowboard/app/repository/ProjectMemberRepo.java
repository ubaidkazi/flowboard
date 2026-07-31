package com.flowboard.app.repository;

import com.flowboard.app.entity.ProjectMember;
import com.flowboard.app.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectMemberRepo extends JpaRepository<ProjectMember, Long>
{
    Optional<ProjectMember> findByProjectIdAndUserId(Long projectId, int userId);

    List<ProjectMember> findByProjectId(Long projectId);



    boolean existsByProjectIdAndUserId(Long projectId, Long userId);

    boolean existsByProject_IdAndUser_Username(
            Long projectId,
            String username
    );

    boolean existsByProject_IdAndUser_UsernameAndRole(
            Long projectId,
            String username,
            Role role);





}