package com.flowboard.app.controller;


import com.flowboard.app.dto.request.AddMemberRequest;
import com.flowboard.app.dto.response.ProjectMemberDTO;
import com.flowboard.app.dto.response.ProjectResponse;
import com.flowboard.app.dto.response.UserResponseDTO;
import com.flowboard.app.entity.Project;
import com.flowboard.app.entity.ProjectMember;
import com.flowboard.app.entity.User;
import com.flowboard.app.service.ProjectService;
import com.flowboard.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/project")
@RestController
public class ProjectController
{

    @Autowired
    ProjectService projectService;

    @Autowired
    UserService userService;



    @PostMapping("/create")
    public ResponseEntity<Project> createProject(@RequestBody Project project)
    {
        return projectService.createProject(project);
    }


    @GetMapping("")
    public ResponseEntity<List<ProjectResponse>> getProject(@AuthenticationPrincipal UserDetails userDetails)
    {
        String username = userDetails.getUsername();


        User user = userService.findUserByUsername(username);
        return projectService.getProjectsByUserId(user.getId());
        //return projectService.getProjectsByUserId(1);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id)
    {
//        System.out.println("DELETE controller hit");
        return projectService.deleteProject(id);
    }

    @GetMapping("/name/{id}")
    public ResponseEntity<String> getProjectName(@PathVariable Long id)
    {
        return projectService.getProjectName(id);
    }





    @GetMapping("/desc/{id}")
    public ResponseEntity<String> getProjectDesc(@PathVariable Long id)
    {
        return projectService.getProjectDesc(id);
    }


    //implement updating name and desc on a single endpoint later.
    @PutMapping("/name/{id}")
    public ResponseEntity<String> updateProjectName(@PathVariable Long id, @RequestBody String name)
    {
        return projectService.updateProjectName(id, name);

    }


    @PutMapping("/desc/{id}")
    public ResponseEntity<String> updateProjectDesc(@PathVariable Long id, @RequestBody String desc)
    {
        return projectService.updateProjectDesc(id, desc);

    }


    @PostMapping("/member/add")
    public ResponseEntity<?> addMember(
            @RequestBody AddMemberRequest request,
            @RequestParam Long projectId) {

        return projectService.addProjectMember(request, projectId);
    }


    @GetMapping("member/all")
    public ResponseEntity<List<ProjectMemberDTO>> getMembers(@RequestParam long projectId)
    {
        return projectService.getProjectMembers(projectId);
    }


    @DeleteMapping("{projectId}/members/{userId}")
    public ResponseEntity<String> deleteProjectMember(@PathVariable int projectId, @PathVariable int userId)
    {

        return projectService.deleteProjectMember(projectId, userId);
    }







}

