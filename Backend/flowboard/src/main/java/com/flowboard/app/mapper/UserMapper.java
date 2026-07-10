package com.flowboard.app.mapper;

import com.flowboard.app.dto.response.BoardMemberDataResponse;
import com.flowboard.app.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public BoardMemberDataResponse toDTO(User user) {
        return new BoardMemberDataResponse(
                user.getId(),
                user.getFullName()
        );
    }
}