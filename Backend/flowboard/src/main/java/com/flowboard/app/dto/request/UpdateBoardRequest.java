package com.flowboard.app.dto.request;

import java.util.List;


public class UpdateBoardRequest
{
    private int boardId;

    private List<UpdateColumnRequest> updatedColumns;

    private List<UpdateCardRequest> updatedCards;


    public int getBoardId() {
        return boardId;
    }

    public void setBoardId(int boardId) {
        this.boardId = boardId;
    }

    public List<UpdateColumnRequest> getUpdatedColumns() {
        return updatedColumns;
    }

    public void setUpdatedColumns(List<UpdateColumnRequest> updatedColumns) {
        this.updatedColumns = updatedColumns;
    }

    public List<UpdateCardRequest> getUpdatedCards() {
        return updatedCards;
    }

    public void setUpdatedCards(List<UpdateCardRequest> updatedCards) {
        this.updatedCards = updatedCards;
    }
}
