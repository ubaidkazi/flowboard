package com.flowboard.app.demo;

import java.util.List;

public class DemoBoardData {

    private String boardName;
    private List<DemoColumnData> columns;


    public DemoBoardData(
            String boardName,
            List<DemoColumnData> columns
    ) {
        this.boardName = boardName;
        this.columns = columns;
    }


    public String getBoardName() {
        return boardName;
    }

    public List<DemoColumnData> getColumns() {
        return columns;
    }
}