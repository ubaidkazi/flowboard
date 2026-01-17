package com.flowboard.app.service;

import com.flowboard.app.entity.Board;
import com.flowboard.app.entity.Card;
import com.flowboard.app.entity.Project;
import com.flowboard.app.entity.TaskColumn;
import com.flowboard.app.repository.BoardRepo;
import com.flowboard.app.repository.CardRepo;
import com.flowboard.app.repository.ProjectRepo;
import com.flowboard.app.repository.TaskColumnRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

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
            //Board sortedBoard = sortBoardData(board);
            //return sortedBoard;
            return board;
        } catch (Exception e) {
            return null;
        }
    }
}

