package com.flowboard.app.mapper;


import com.flowboard.app.dto.response.CardDTO;
import com.flowboard.app.dto.response.UserResponseDTO;
import com.flowboard.app.entity.Card;
import com.flowboard.app.entity.User;
import org.springframework.stereotype.Component;

@Component
public class CardMapper {



    public CardDTO toDTO(Card card)
    {
        return new CardDTO(card.getId().intValue(), card.getTitle(), card.getDescription(), card.getPosition(),card.getPriority(), card.getProgress(), card.getDueDate(), card.isChecked(), card.getAssignedMembers()
                .stream()
                .map(this::userToDTO)
                .toList()
          );
    }


    public UserResponseDTO userToDTO(User user)
    {
        return new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail(), user.getFullName());
    }
}
