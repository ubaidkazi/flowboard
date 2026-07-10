package com.flowboard.app.dto.response;


import com.flowboard.app.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO
{

    private int id;
    private String username;
    private String email;
    private String fullName;

}
