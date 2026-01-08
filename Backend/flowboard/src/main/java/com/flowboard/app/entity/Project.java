package com.flowboard.app.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Project
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;


    @ManyToOne(fetch = FetchType.EAGER) // A board is created by one user
    @JoinColumn(name = "owner_id")
    private User owner;


    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true) // One project has many boards
    @JsonManagedReference
    private List<Board> boards;

    private LocalDateTime timeCreated;
    private LocalDateTime timeUpdated;


    @ManyToOne
    private Team team; // Nullable — if null, it’s a personal project

    @OneToMany(mappedBy = "project")
    private List<ProjectMember> members;
}
