package com.flowboard.app.repository;

import com.flowboard.app.dto.response.ProjectResponse;
import com.flowboard.app.entity.Project;
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


    @Query("SELECT new com.flowboard.app.dto.response.ProjectResponse(p.id, p.name,p.description, 'OWNER') " +
            "FROM Project p WHERE p.owner.id = :userId")
    List<ProjectResponse> findOwnedProjects(@Param("userId") Integer userId);



    @Query("SELECT new com.flowboard.app.dto.response.ProjectResponse(p.id, p.name, p.description, CAST(pm.role AS string)) " +
            "FROM ProjectMember pm JOIN pm.project p WHERE pm.user.id = :userId")
    List<ProjectResponse> findSharedProjects(@Param("userId") Integer userId);


}