package com.flowboard.app.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Board
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String description;


    @ManyToOne(fetch = FetchType.EAGER) // A board is created by one user
    @JoinColumn(name = "user_id")
    private User user;
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true) // One board has many lists
    @JsonManagedReference
    private List<TaskColumn> columns;


    @ManyToOne(fetch = FetchType.LAZY) // Each list belongs to one board
    @JoinColumn(name = "project_id")
    @JsonBackReference
    private Project project;


    private LocalDateTime timeCreated;
    private LocalDateTime timeUpdated;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<TaskColumn> getColumns() {
        return columns;
    }

    public void setColumns(List<TaskColumn> columns) {
        this.columns = columns;
    }

    public LocalDateTime getTimeCreated() {
        return timeCreated;
    }

    public void setTimeCreated(LocalDateTime timeCreated) {
        this.timeCreated = timeCreated;
    }

    public LocalDateTime getTimeUpdated() {
        return timeUpdated;
    }

    public void setTimeUpdated(LocalDateTime timeUpdated) {
        this.timeUpdated = timeUpdated;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
