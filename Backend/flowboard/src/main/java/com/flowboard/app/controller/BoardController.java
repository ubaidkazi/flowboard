package com.flowboard.app.controller;



import com.flowboard.app.entity.Board;
import com.flowboard.app.entity.Card;
import com.flowboard.app.entity.TaskColumn;
import com.flowboard.app.entity.User;
import com.flowboard.app.service.BoardService;
import com.flowboard.app.service.CardService;
import com.flowboard.app.service.TaskColumnService;
import com.flowboard.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/board")
public class BoardController
{

    @Autowired
    BoardService boardService;

    @Autowired
    TaskColumnService taskColumnService;


    @Autowired
    UserService userService;

    @Autowired
    CardService cardService;








    @PostMapping("/{projectId}")
    public ResponseEntity<Board> createBoard(@RequestBody Board board, @PathVariable Long projectId) {

        board.setTimeCreated(LocalDateTime.now());
        board.setTimeUpdated(LocalDateTime.now());

        try
        {
            // Link columns to board
            if (board.getColumns() != null) {
                for (TaskColumn column : board.getColumns()) {
                    column.setBoard(board);
                }
            }
        }
        catch (Exception e)
        {
            System.out.println(e + "Exception thrown");
        }

        return  boardService.createBoard(board, projectId);
    }

    @GetMapping("")
    public ResponseEntity<List<Board>> getBoard(@AuthenticationPrincipal UserDetails userDetails)
    {
        String username = userDetails.getUsername();
        //User user = userService.findUserByUsername(username);
        //return boardService.getBoardsByUserId(user.getId());
        return boardService.getBoardsByUserId(1);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Board>> getBoardByProject(@PathVariable Long projectId)
    {
        return boardService.getBoardsByProjectId(projectId);
    }



    @GetMapping("/{id}")
    public ResponseEntity<Board> getBoardById(@PathVariable int id)
    {
        Board board = boardService.getBoardById(id);

//        Users currentUser = userService.getCurrentUser();
//        boolean isOwner =  board.getUser().getId().equals(currentUser.getId());
//
//        if (!isOwner)
//        {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
//        }

        return ResponseEntity.ok(board);

    }




    @DeleteMapping("/{id}")
    public ResponseEntity<Board> deleteBoard(@PathVariable int id)
    {
        return boardService.deleteBoard(id);
    }






}
