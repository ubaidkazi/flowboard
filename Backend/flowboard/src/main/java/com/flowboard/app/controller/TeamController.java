package com.flowboard.app.controller;


import com.flowboard.app.entity.Team;
import com.flowboard.app.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TeamController
{
    @Autowired
    TeamService teamService;


//    @PostMapping("team/create")
//     public ResponseEntity<Team> createATeam(@RequestBody Team team)
//     {
//
//         return teamService.createTeam(team);
//     }
//
//
//     @GetMapping("teams")
//     public ResponseEntity<List<Team>> getAllTeams()
//     {
//         return teamService.getTeams();
//     }
}
