package com.flowboard.app.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardCardDataResponse
{
    private long id;
    private String title;
    private int columnCount;
    private List<BoardMemberDataResponse> boardMembers;


    public BoardCardDataResponse(long id, String title)
    {
        this.id = id;
        this.title = title;
    }




}
