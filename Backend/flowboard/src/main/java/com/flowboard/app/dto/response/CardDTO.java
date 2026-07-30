package com.flowboard.app.dto.response;

import com.flowboard.app.enums.CardProgress;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardDTO
{
    private int id;
    private String title;
    private String description;
    private int position;
    private String priority;
    private CardProgress progress;
    private LocalDate dueDate;
    private List<UserResponseDTO> assignedMembers;

}
