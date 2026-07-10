package com.flowboard.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private String username;
    private String fullName;
    private String email;
    private String passwordHash;


    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] profilePicture;

    private String profilePictureType; // "image/png", "image/jpeg"

}
