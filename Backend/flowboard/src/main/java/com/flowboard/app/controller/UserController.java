package com.flowboard.app.controller;

import com.flowboard.app.dto.request.LoginRequest;
import com.flowboard.app.entity.User;
import com.flowboard.app.security.JWTService;
import com.flowboard.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
public class UserController
{
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


    @Autowired
    UserService userService;


    @Autowired
    JWTService jwtService;



    @PostMapping("register")
    public User register(@RequestBody User user)
    {
        user.setPasswordHash(encoder.encode(user.getPasswordHash()));
        return  userService.register(user);
    }


    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody LoginRequest user)
    {
        try
        {
            String token = jwtService.generateToken(user.getUsername());
            System.out.println("Generated token: " + token);
            return userService.verify(user.getUsername(), user.getPassword());
        }
        catch (Exception e)
        {
            return new ResponseEntity<>("Exception", HttpStatus.BAD_REQUEST);
        }

    }

//    @GetMapping("currentuser")
//    public ResponseEntity<String> getCurrentUser()
//    {
//        return service.getCurrentUser();
//    }
//
//

}
