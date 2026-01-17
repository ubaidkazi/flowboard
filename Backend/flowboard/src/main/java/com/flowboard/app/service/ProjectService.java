package com.flowboard.app.service;





import com.flowboard.app.dto.response.ProjectResponse;
import com.flowboard.app.entity.Project;
import com.flowboard.app.entity.ProjectMember;
import com.flowboard.app.entity.User;
import com.flowboard.app.repository.ProjectMemberRepo;
import com.flowboard.app.repository.ProjectRepo;
import com.flowboard.app.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProjectService
{


    @Autowired
    ProjectMemberRepo projectMemberRepo;


    @Autowired
    UserRepo userRepo;

    @Autowired
    ProjectRepo projectRepo;


    public ResponseEntity<Project> createProject(Project project)
    {

        return new ResponseEntity<>(projectRepo.save(project), HttpStatus.OK);
    }


    public ResponseEntity<List<ProjectResponse>> getProjectsByUserId(int userId)
    {
//        List<Project> projects = projectRepo.findByUserId(userId);
//        return new ResponseEntity<>(projects, HttpStatus.OK);

        List<ProjectResponse> owned = projectRepo.findOwnedProjects(userId);
        List<ProjectResponse> shared = projectRepo.findSharedProjects(userId);

        Set<Long> ownedIds = owned.stream().map(ProjectResponse::getId).collect(Collectors.toSet());

        List<ProjectResponse> filteredShared = shared.stream()
                .filter(p -> !ownedIds.contains(p.getId()))
                .collect(Collectors.toList());

        owned.addAll(filteredShared);
        return new ResponseEntity<>(owned, HttpStatus.OK);




    }


    public ResponseEntity<Project> deleteProject(Long id)
    {
        try
        {
            Project project = projectRepo.findById(id).get();
            projectRepo.deleteById(id);
            return new ResponseEntity<>(project, HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>((HttpHeaders) null, HttpStatus.NO_CONTENT);
        }
    }

    public ResponseEntity<String> getProjectName(Long id)
    {
        String projectName = projectRepo.findNameById(id);
        return new ResponseEntity<>(projectName, HttpStatus.OK);
    }

    public ResponseEntity<String> updateProjectName(Long id, String projectName)
    {
        Project project = projectRepo.findById(id).get();
        project.setName(projectName);
        projectRepo.save(project);
        String message = "Project name updated to " + project.getName();
        return new ResponseEntity<>(projectName, HttpStatus.OK);
    }


    public ResponseEntity<String> getProjectDesc(Long id)
    {
        String projectName = projectRepo.findDescriptionById(id);
        return new ResponseEntity<>(projectName, HttpStatus.OK);
    }

    public ResponseEntity<String> updateProjectDesc(Long id, String projectDesc)
    {
        Project project = projectRepo.findById(id).get();
        project.setDescription(projectDesc);
        projectRepo.save(project);
        String message = "Project desc updated to " + project.getDescription();
        return new ResponseEntity<>(projectDesc, HttpStatus.OK);
    }






}
