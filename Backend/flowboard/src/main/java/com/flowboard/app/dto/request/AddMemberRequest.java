package com.flowboard.app.dto.request;

import com.flowboard.app.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddMemberRequest {

    private String identifier;
    private Role role;
}
