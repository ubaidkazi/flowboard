package com.flowboard.app.dto.response;


import com.flowboard.app.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardMemberDataResponse
{
    private int id;
    private String fullName;


    public BoardMemberDataResponse toDTO(User user) {
        BoardMemberDataResponse dto = new BoardMemberDataResponse();

        dto.setId(user.getId());
        dto.setFullName(user.getFullName());

        return dto;
    }


}
