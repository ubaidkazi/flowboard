package com.flowboard.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ColumnDTO
{
    private int id;
    private String name;
    private int position;
    private List<CardDTO> cards;
}
