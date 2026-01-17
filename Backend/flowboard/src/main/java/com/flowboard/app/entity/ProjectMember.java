package com.flowboard.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.flowboard.app.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ProjectMember
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore
    private Project project;

    @ManyToOne
    private User user;

    @Enumerated(EnumType.STRING)
    private Role role;
}
