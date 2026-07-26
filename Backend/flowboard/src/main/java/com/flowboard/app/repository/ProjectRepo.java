package com.flowboard.app.repository;

import com.flowboard.app.dto.response.ProjectResponse;
import com.flowboard.app.dto.response.dashboard.RecentProjectResponse;
import com.flowboard.app.entity.Project;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepo extends JpaRepository<Project, Long>
{

    List<Project> findByOwnerId(int ownerId);

    @Query("SELECT p.name FROM Project p WHERE p.id = :id")
    String findNameById(@Param("id") Long id);

    @Query("SELECT p.description FROM Project p WHERE p.id = :id")
    String findDescriptionById(@Param("id") Long id);


//    @Query("SELECT new com.flowboard.app.dto.response.ProjectResponse(p.id, p.name,p.description, 'OWNER') " +
//            "FROM Project p WHERE p.owner.id = :userId")
//    List<ProjectResponse> findOwnedProjects(@Param("userId") Integer userId);
//
//
//
//    @Query("SELECT new com.flowboard.app.dto.response.ProjectResponse(p.id, p.name, p.description, CAST(pm.role AS string)) " +
//            "FROM ProjectMember pm JOIN pm.project p WHERE pm.user.id = :userId")
//    List<ProjectResponse> findSharedProjects(@Param("userId") Integer userId);
//


    @Query("SELECT p FROM Project p WHERE p.owner.id = :userId")
    List<Project> findOwnedProjects(@Param("userId") Integer userId);


    @Query("SELECT DISTINCT p FROM ProjectMember pm JOIN pm.project p WHERE pm.user.id = :userId")
    List<Project> findSharedProjects(@Param("userId") Integer userId);


    @Query("SELECT p.name FROM Project p WHERE p.id = :id")
    String findProjectById(@Param("id") Long id);



    @Query("""
        SELECT COUNT(DISTINCT p.id)
        FROM Project p
        LEFT JOIN p.members pm
        WHERE p.owner.id = :userId
           OR pm.user.id = :userId
        """)
    long countAccessibleProjects(@Param("userId") Long userId);


    @Query("""
    SELECT COUNT(DISTINCT member.user.id)
    FROM Project project
    JOIN project.members member
    WHERE project.id IN (
        SELECT accessibleProject.id
        FROM Project accessibleProject
        JOIN accessibleProject.members currentMembership
        WHERE currentMembership.user.id = :userId
    )
    AND member.user.id <> :userId
    """)
    long countActiveCollaborators(@Param("userId") Long userId);


    @Query("""
    SELECT new com.flowboard.app.dto.response.dashboard.RecentProjectResponse(
        project.id,
        project.name,
        project.description,
        membership.role,
        project.timeUpdated
    )
    FROM Project project
    JOIN project.members membership
    WHERE membership.user.id = :userId
    ORDER BY project.timeUpdated DESC
""")
    List<RecentProjectResponse> findRecentProjectsForUser(
            @Param("userId") Long userId,
            Pageable pageable
    );






}