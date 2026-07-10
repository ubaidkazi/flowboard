package com.flowboard.app.controller;



import com.flowboard.app.dto.request.UpdateBoardNameRequest;
import com.flowboard.app.dto.response.BoardCardDataResponse;
import com.flowboard.app.dto.response.BoardDataResponseDTO;
import com.flowboard.app.dto.response.BoardResponseDTO;
import com.flowboard.app.entity.Board;
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

    //Get all boards linked with a project
    @GetMapping("")
    public ResponseEntity<List<Board>> getBoard(@AuthenticationPrincipal UserDetails userDetails)
    {
        String username = userDetails.getUsername();
        User user = userService.findUserByUsername(username);
        return boardService.getBoardsByUserId(user.getId());
        //return boardService.getBoardsByUserId(1);
    }


    //Being used to get all the boards inside a project
    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<BoardDataResponseDTO>> getBoardByProject(@PathVariable Long projectId)
    {
        return boardService.getBoardsByProjectId(projectId);
    }

    //board data for board cards and avatars
    @GetMapping("/data/{projectId}")
    public ResponseEntity<List<BoardCardDataResponse>> getBoardDataByProject(@PathVariable Long projectId)
    {
        return boardService.getBoardDataByProjectId(projectId);
    }





    //get a board and its data by its id (used for the board page)
    @GetMapping("/{id}")
    public ResponseEntity<BoardResponseDTO> getBoardById(@PathVariable int id)
    {
        BoardResponseDTO board = boardService.getBoardById(id);

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

    @PutMapping("name/{boardId}")
    public ResponseEntity<String> updateBoardName(@PathVariable int boardId, @RequestBody UpdateBoardNameRequest request)
    {
        return boardService.updateBoardName(boardId, request.getBoardName());
    }









}
