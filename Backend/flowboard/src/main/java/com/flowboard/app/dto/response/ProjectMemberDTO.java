package com.flowboard.app.dto.response;

import com.flowboard.app.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class ProjectMemberDTO
{
    private int id;
    private String fullName;
    private String username;
    private String email;
    private Role role;

}
