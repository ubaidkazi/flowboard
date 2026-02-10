package com.flowboard.app.service;

import com.flowboard.app.entity.User;
import com.flowboard.app.repository.UserRepo;
import com.flowboard.app.security.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserService
{

    @Autowired
    JWTService jwtService;

    @Autowired
    UserRepo repo;


    @Autowired
    AuthenticationManager authenticationManager;

    public User register(User user)
    {
        return repo.save(user);
    }

    public ResponseEntity<?> verify(String username, String password)
    {
        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        if(authentication.isAuthenticated())
        {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            User user = repo.findByUsername(username).get();
            String token = jwtService.generateToken(username);
            return new ResponseEntity<>(Map.of("token", token, "userId", user.getId(), "userName", user.getUsername(), "email", user.getEmail(), "fullName", user.getFullName() ), HttpStatus.OK);
        }
        return new ResponseEntity<>("Invalid Credentials", HttpStatus.UNAUTHORIZED);
    }



    public User findUserByUsername(String username)
    {
        return repo.findByUsername(username).get();
    }



    public ResponseEntity<List<User>> searchUsers(String query)
    {
        User currentUser = getCurrentUser();

        List<User> result = repo
                .findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(query, query)
                .stream()
                .filter(user -> !user.getId().equals(currentUser.getId())) // Exclude self
                .collect(Collectors.toList());


        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    //get current logged in user
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return repo.findByUsername(username).get();
    }


}
