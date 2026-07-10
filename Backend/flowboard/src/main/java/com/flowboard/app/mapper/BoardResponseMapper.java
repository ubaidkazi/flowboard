package com.flowboard.app.mapper;
import com.flowboard.app.entity.Board;
import com.flowboard.app.entity.Card;
import com.flowboard.app.entity.TaskColumn;
import com.flowboard.app.entity.User;
import org.springframework.stereotype.Component;

import java.util.List;


import com.flowboard.app.dto.response.BoardResponseDTO;
import com.flowboard.app.dto.response.CardDTO;
import com.flowboard.app.dto.response.ColumnDTO;
import com.flowboard.app.dto.response.UserResponseDTO;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BoardResponseMapper {

    public BoardResponseDTO toDTO(Board board) {

        if (board == null) {
            return null;
        }

        BoardResponseDTO dto = new BoardResponseDTO();

        dto.setId(board.getId());
        dto.setTitle(board.getName());
        dto.setOwner(toUserDTO(board.getUser()));
        dto.setColumns(toColumnDTOList(board.getColumns()));
        dto.setProjectId(board.getProject().getId());

        return dto;
    }

    private List<ColumnDTO> toColumnDTOList(List<TaskColumn> columns) {
        return columns.stream()
                .map(this::toColumnDTO)
                .toList();
    }

    private ColumnDTO toColumnDTO(TaskColumn column) {

        ColumnDTO dto = new ColumnDTO();

        dto.setId(column.getId().intValue());
        dto.setName(column.getName());
        dto.setPosition(column.getPosition());
        dto.setCards(toCardDTOList(column.getCards()));

        return dto;
    }

    private List<CardDTO> toCardDTOList(List<Card> cards) {
        return cards.stream()
                .map(this::toCardDTO)
                .toList();
    }

    private CardDTO toCardDTO(Card card) {

        CardDTO dto = new CardDTO();

        dto.setId(card.getId().intValue());
        dto.setTitle(card.getTitle());
        dto.setDescription(card.getDescription());
        dto.setPosition(card.getPosition());
        dto.setPriority(card.getPriority());
        dto.setProgress(card.getProgress());
        dto.setDueDate(card.getDueDate());
        dto.setChecked(card.isChecked());
        dto.setAssignedMembers(toUserDTOList(card.getAssignedMembers()));

        return dto;
    }

    private List<UserResponseDTO> toUserDTOList(List<User> users) {
        return users.stream()
                .map(this::toUserDTO)
                .toList();
    }

    private UserResponseDTO toUserDTO(User user) {

        UserResponseDTO dto = new UserResponseDTO();


        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setUsername(user.getUsername());

        return dto;
    }
}