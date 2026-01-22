package com.flowboard.app.service;

import com.flowboard.app.dto.request.UpdateBoardRequest;
import com.flowboard.app.dto.request.UpdateCardRequest;
import com.flowboard.app.dto.request.UpdateColumnRequest;
import com.flowboard.app.entity.Board;
import com.flowboard.app.entity.Card;
import com.flowboard.app.entity.Project;
import com.flowboard.app.entity.TaskColumn;
import com.flowboard.app.repository.BoardRepo;
import com.flowboard.app.repository.CardRepo;
import com.flowboard.app.repository.ProjectRepo;
import com.flowboard.app.repository.TaskColumnRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BoardService {
    @Autowired
    ProjectRepo projectRepo;
    @Autowired
    BoardRepo boardRepo;

    @Autowired
    TaskColumnRepo columnRepo;

    @Autowired
    CardRepo cardRepo;

    public ResponseEntity<Board> createBoard(Board board, Long projectId) {
        if (board.getColumns() != null) {
            for (TaskColumn column : board.getColumns()) {
                column.setBoard(board); // establish parent for column

                if (column.getCards() != null) {
                    for (Card card : column.getCards()) {
                        card.setColumn(column); // establish parent for card
                    }
                }
            }
        }
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        board.setProject(project);

        return new ResponseEntity<>(boardRepo.save(board), HttpStatus.OK);
    }

    public ResponseEntity<List<Board>> getBoardsByUserId(int userId) {
        List<Board> boards = boardRepo.findByUserId(userId);
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }


    public ResponseEntity<List<Board>> getBoardsByProjectId(Long projectId) {
        List<Board> boards = boardRepo.findByProjectId(projectId);
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }

    public ResponseEntity<Board> deleteBoard(int id) {
        try {
            Board board = boardRepo.findById(id).get();
            boardRepo.deleteById(id);
            return new ResponseEntity<>(board, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>((HttpHeaders) null, HttpStatus.NO_CONTENT);
        }
    }

    public Board getBoardById(int id) {
        try {
            Board board = boardRepo.findById(id).get();
            Board sortedBoard = sortBoardData(board);
            return sortedBoard;
        } catch (Exception e) {
            return null;
        }
    }

    public Board sortBoardData(Board board)
    {
        List<TaskColumn> columns = board.getColumns();

        List<TaskColumn> sortedColumns = columns.stream()
                .sorted(Comparator.comparingInt(TaskColumn::getPosition))
                .toList();

        for(TaskColumn column:sortedColumns)
        {
            List<Card> sortedCards = column.getCards().stream()
                    .sorted(Comparator.comparingInt(Card::getPosition))
                    .toList();

            column.setCards(sortedCards);

        }

        board.setColumns(sortedColumns);
        return board;
    }



    @Transactional
    public ResponseEntity<String> updateBoardPositions(UpdateBoardRequest board) {
        Board oldBoard = boardRepo.findById(board.getBoardId())
                .orElseThrow(() -> new RuntimeException("Board not found with id: " + board.getBoardId()));

        Map<Long, TaskColumn> columnMap = new HashMap<>();

        if (board.getUpdatedColumns() != null) {
            List<TaskColumn> updatedColumns = new ArrayList<>();
            for (UpdateColumnRequest newColumn : board.getUpdatedColumns()) {
                TaskColumn column = columnRepo.findById(newColumn.getId())
                        .orElseThrow(() -> new RuntimeException("Column not found: " + newColumn.getId()));
                column.setPosition(newColumn.getPosition());
                columnMap.put(column.getId(), column);
                updatedColumns.add(column);
            }
            columnRepo.saveAll(updatedColumns);
        }

        if (board.getUpdatedCards() != null) {
            List<Card> updatedCards = new ArrayList<>();
            for (UpdateCardRequest newCard : board.getUpdatedCards()) {
                Card card = cardRepo.findById(newCard.getId())
                        .orElseThrow(() -> new RuntimeException("Card not found: " + newCard.getId()));

                TaskColumn parentColumn = columnMap.get(newCard.getColumnId());
                if (parentColumn == null) {
                    parentColumn = columnRepo.findById(newCard.getColumnId())
                            .orElseThrow(() -> new RuntimeException("Column not found: " + newCard.getColumnId()));
                }

                card.setColumn(parentColumn);
                card.setPosition(newCard.getPosition());
                updatedCards.add(card);
            }
            cardRepo.saveAll(updatedCards);
        }

        return new ResponseEntity<>("okay", HttpStatus.OK);
    }


}

