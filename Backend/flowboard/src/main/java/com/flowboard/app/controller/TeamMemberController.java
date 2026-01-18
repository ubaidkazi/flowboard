package com.flowboard.app.controller;


import com.flowboard.app.service.TeamMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TeamMemberController
{

    @Autowired
    TeamMemberService teamMemberService;


    @PostMapping("team/add/{teamId}/{userName}")
    public ResponseEntity<String> addATeamMember(@PathVariable String userName, @PathVariable Long teamId)
    {
        return teamMemberService.addATeamMember(teamId, userName);
    }
 }
