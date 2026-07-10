package com.flowboard.app.service;





import com.flowboard.app.dto.request.AddMemberRequest;
import com.flowboard.app.dto.response.ProjectMemberDTO;
import com.flowboard.app.dto.response.ProjectResponse;
import com.flowboard.app.dto.response.UserResponseDTO;
import com.flowboard.app.entity.Project;
import com.flowboard.app.entity.ProjectMember;
import com.flowboard.app.entity.User;
import com.flowboard.app.enums.Role;
import com.flowboard.app.mapper.ProjectMemberMapper;
import com.flowboard.app.mapper.ProjectResponseMapper;
import com.flowboard.app.mapper.UserMapper;
import com.flowboard.app.repository.ProjectMemberRepo;
import com.flowboard.app.repository.ProjectRepo;
import com.flowboard.app.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
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


    @Autowired
    UserService userService;

    @Autowired
    ProjectResponseMapper projectResponseMapper;

    @Autowired
    ProjectMemberMapper projectMemberMapper;


    public ResponseEntity<Project> createProject(Project project)
    {
        Project newProject = projectRepo.save(project);

        String userName = userService.getCurrentUser().getUsername();

        //Add owner as a project member with OWNER role.
        AddMemberRequest request = new AddMemberRequest(userName, Role.OWNER);
        addProjectMember(request, newProject.getId());

        return new ResponseEntity<>(newProject, HttpStatus.OK);
    }


    public ResponseEntity<List<ProjectResponse>> getProjectsByUserId(int userId) {

        List<Project> owned = projectRepo.findOwnedProjects(userId);
        List<Project> shared = projectRepo.findSharedProjects(userId);

        Set<Long> ownedIds = owned.stream()
                .map(Project::getId)
                .collect(Collectors.toSet());

        // remove duplicates (projects where user is both owner + member)
        List<Project> filteredShared = shared.stream()
                .filter(p -> !ownedIds.contains(p.getId()))
                .toList();

        List<ProjectResponse> result = new ArrayList<>();

        result.addAll(
                owned.stream()
                        .map(p -> projectResponseMapper.toDTO(p, "OWNER"))
                        .toList()
        );

        result.addAll(
                filteredShared.stream()
                        .map(p -> projectResponseMapper.toDTO(p, "MEMBER"))
                        .toList()
        );

        return ResponseEntity.ok(result);
    }


    public ResponseEntity<String> deleteProject(Long id)
    {
        try {
            Project project = projectRepo.findById(id).get();
            projectRepo.delete(project);
            return new ResponseEntity<>("Project Deleted", HttpStatus.OK);
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


    public ResponseEntity<?> addProjectMember(AddMemberRequest request,  Long projectId)
    {

        User user;

        if (request.getIdentifier().contains("@")) {
            user = userRepo.findByEmail(request.getIdentifier())
                    .orElseThrow(() -> new RuntimeException("User not found"));
        } else {
            user = userRepo.findByUsername(request.getIdentifier())
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }


        if (projectMemberRepo.existsByProjectIdAndUserId(projectId, (long) user.getId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("This user is already a member of this project");
        }

        if (request.getRole() != Role.OWNER && user.getId().equals(userService.getCurrentUser().getId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("You cannot add yourself.");
        }


        ProjectMember member = new ProjectMember();
        member.setUser(user);
        member.setRole(request.getRole());

        // find project, set project, save...
        Project project = projectRepo.findById(projectId).get();
        member.setProject(project);
        ProjectMember savedMember = projectMemberRepo.save(member);
        ProjectMemberDTO dto = projectMemberMapper.toDTO(savedMember);

        return new ResponseEntity<>(dto, HttpStatus.OK);


    }


    public ResponseEntity<List<ProjectMemberDTO>> getProjectMembers(long projectId)
    {
        List<ProjectMemberDTO> members = projectMemberRepo.findByProjectId(projectId)
                .stream()
                .map(projectMemberMapper::toDTO)
                .toList();

        if (members.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        return ResponseEntity.ok(members);
    }


    public ResponseEntity<String> deleteProjectMember(int projectId, int userId) {

        Project project = projectRepo.findById((long) projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User currentUser = userService.getCurrentUser();

        // Only the project owner can remove members
        if (!project.getOwner().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You don't have permission to remove other members :)");
        }

        ProjectMember member = projectMemberRepo
                .findByProjectIdAndUserId((long) projectId, userId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        // Prevent removing the owner
        if (member.getRole() == Role.OWNER) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("The project owner cannot be removed.");
        }

        projectMemberRepo.delete(member);

        return ResponseEntity.ok("Member removed successfully.");
    }
}
