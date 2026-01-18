package com.flowboard.app.service;

import com.flowboard.app.entity.Team;
import com.flowboard.app.entity.TeamMember;
import com.flowboard.app.entity.User;
import com.flowboard.app.repository.TeamMemberRepo;
import com.flowboard.app.repository.TeamRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TeamMemberService
{
    @Autowired
    private TeamMemberRepo teamMemberRepo;

    @Autowired
    private TeamRepo teamRepo;

    @Autowired
    private UserService userService;


    //Adding a team member to a team that already exist using its id
    public ResponseEntity<String> addATeamMember(Long teamId, String userName)
    {

        //User userToAdd = userService.findUserByUsername(userName);
        //TeamMember foundMember = teamMemberRepo.findByUserId(userToAdd.getId());
        TeamMember foundMember = teamMemberRepo.findByUserId(1);
        boolean isMember = (foundMember != null);
        if(isMember)
        {
            return new ResponseEntity<>("Member Already is a part of the team!" , HttpStatus.ALREADY_REPORTED);
        }

        TeamMember teamMember = new TeamMember();
        Team team = teamRepo.findById(teamId).get();
        teamMember.setTeam(team);
        //teamMember.setUser(userToAdd);
        teamMemberRepo.save(teamMember);
        return new ResponseEntity<>("Added Successfully", HttpStatus.OK);








    }


}
