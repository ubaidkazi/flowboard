package com.flowboard.app.service;

import com.flowboard.app.entity.Board;
import com.flowboard.app.entity.Card;
import com.flowboard.app.entity.TaskColumn;
import com.flowboard.app.repository.BoardRepo;
import com.flowboard.app.repository.TaskColumnRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TaskColumnService
{
    @Autowired
    BoardRepo boardRepo;

    @Autowired
    TaskColumnRepo columnRepo;

    public ResponseEntity<TaskColumn> createColumn(TaskColumn column, int boardId)
    {

        Board board = boardRepo.findById(boardId).get();
        column.setBoard(board);

        try
        {
            // Link cards to the column
            if (column.getCards() != null) {
                for (Card card : column.getCards()) {
                    card.setColumn(column);
                }
            }
        }
        catch (Exception e)
        {
            System.out.println(e + "Exception thrown");
        }
        int newPosition = columnRepo.findMaxPositionByBoardId(boardId) + 1;
        column.setPosition(newPosition);

        columnRepo.save(column);

        return new ResponseEntity<TaskColumn>(column, HttpStatus.OK);
    }


    public ResponseEntity<TaskColumn> deleteColumn(int boardId, int columnId)
    {
        TaskColumn column = columnRepo.findById(columnId).get();
        columnRepo.delete(column);
        //NormalizeColumnPositions(boardId);
        return new ResponseEntity<>(column, HttpStatus.OK);
    }

}