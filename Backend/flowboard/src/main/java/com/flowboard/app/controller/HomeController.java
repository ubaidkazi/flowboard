package com.flowboard.app.controller;


import com.flowboard.app.entity.User;
import com.flowboard.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class HomeController
{


    //@Autowired
    //JWTService jwtService;

    @Autowired
    UserService userService;


    @RequestMapping("/")
    public String home()
    {
        return "This is home page!";
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/dashboard")
    public ResponseEntity<String> getDashboard()
    {
        return ResponseEntity.ok("Welcome to your dashboard!");
    }


//    @GetMapping("/users/search")
//    public ResponseEntity<List<User>> findUsers(@RequestParam String query)
//    {
//        return userService.searchUsers(query);
//    }
}
