package com.flowboard.app.service;

import com.flowboard.app.entity.User;
import com.flowboard.app.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserService
{

    @Autowired
    UserRepo userRepo;


    @Autowired
    AuthenticationManager authenticationManager;




    public User register(User user)
    {
        return userRepo.save(user);
    }

    public ResponseEntity<?> verify(String username, String password)
    {
        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        if(authentication.isAuthenticated())
        {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            User user = userRepo.findByUsername(username).get();
            //String token = jwtService.generateToken(username);
            //return new ResponseEntity<>(Map.of("token", token, "userId", user.getId(), "userName", user.getUsername(), "email", user.getEmail(), "fullName", user.getFullName() ), HttpStatus.OK);
        }
        return new ResponseEntity<>("Invalid Credentials", HttpStatus.UNAUTHORIZED);
    }
}
