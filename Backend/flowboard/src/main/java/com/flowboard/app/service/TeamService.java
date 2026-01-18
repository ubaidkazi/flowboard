package com.flowboard.app.service;

import com.flowboard.app.entity.Team;
import com.flowboard.app.entity.User;
import com.flowboard.app.repository.TeamRepo;
import com.flowboard.app.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService
{
    @Autowired
    private TeamRepo teamRepo;

    @Autowired
    private UserRepo userRepo;


    @Autowired
    private UserService userService;



//    public ResponseEntity<Team> createTeam(Team team)
//    {
//        User owner = userService.getCurrentUser();
//        team.setOwner(owner);
//        teamRepo.save(team);
//        return new ResponseEntity<>(team, HttpStatus.OK);
//    }

//    public ResponseEntity<List<Team>> getTeams()
//    {
//        User owner = userService.getCurrentUser();
//        List<Team> teams = teamRepo.findByOwnerId(owner.getId());
//
//        return new ResponseEntity<>(teams, HttpStatus.OK);
//
//    }

}
