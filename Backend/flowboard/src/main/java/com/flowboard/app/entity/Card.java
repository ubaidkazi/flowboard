package com.flowboard.app.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.flowboard.app.enums.CardProgress;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Card
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob
    private String description;

    private Integer position; // Position of the card in the list

    @ManyToOne(fetch = FetchType.LAZY) // Each card belongs to one list
    @JoinColumn(name = "column_id")
    @JsonBackReference // skip serializing parent Column in Card
    private TaskColumn column;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private String priority = "Low";

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CardProgress progress = CardProgress.NOT_STARTED;
    private LocalDate dueDate;


    @ManyToMany
    @JoinTable(
            name="card_members",
            joinColumns=@JoinColumn(name="card_id"),
            inverseJoinColumns=@JoinColumn(name="user_id")
    )
    private List<User> assignedMembers = new ArrayList<>();



}
