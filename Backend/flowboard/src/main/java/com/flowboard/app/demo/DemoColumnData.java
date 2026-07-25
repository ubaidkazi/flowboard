package com.flowboard.app.demo;

import java.util.List;

public class DemoColumnData {

    private String columnName;
    private List<String> cards;


    public DemoColumnData(
            String columnName,
            List<String> cards
    ) {
        this.columnName = columnName;
        this.cards = cards;
    }


    public String getColumnName() {
        return columnName;
    }

    public List<String> getCards() {
        return cards;
    }
}