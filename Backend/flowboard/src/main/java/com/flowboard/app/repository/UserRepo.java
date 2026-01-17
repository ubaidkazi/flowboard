package com.flowboard.app.repository;


import com.flowboard.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Integer>
{
    Optional<User> findByUsername(String username);

    List<User> findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(String usernamePart, String emailPart);




}