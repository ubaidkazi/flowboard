package com.flowboard.app.controller;


import com.flowboard.app.dto.request.MoveCardRequest;
import com.flowboard.app.dto.request.MoveColumnRequest;
import com.flowboard.app.dto.request.UpdateColumnNameRequest;
import com.flowboard.app.entity.TaskColumn;
import com.flowboard.app.service.TaskColumnService;
import org.hibernate.sql.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.config.Task;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/board")
public class TaskColumnController
{



    @Autowired
    TaskColumnService taskColumnService;



    //Create a new column
    @PostMapping("/column/{id}")
    public ResponseEntity<TaskColumn> createColumn(@RequestBody TaskColumn column, @PathVariable int id)
    {
        return taskColumnService.createColumn(column, id);
    }


    //Delete a specific column
    @DeleteMapping("/{boardId}/{columnId}")
    public ResponseEntity<TaskColumn> deleteColumn(@PathVariable int boardId, @PathVariable int columnId)
    {
        return taskColumnService.deleteColumn(boardId, columnId);
    }

    //Update column name
    @PutMapping("/column/{columnId}")
    public  ResponseEntity<TaskColumn> updateColumnName(@PathVariable int columnId, @RequestBody UpdateColumnNameRequest request)
    {
        return taskColumnService.updateColumnName(columnId, request.getNewTitle());
    }


    @PostMapping("/moveColumn")
    public ResponseEntity<String> moveCard(@RequestBody MoveColumnRequest request)
    {
        return taskColumnService.moveColumn(request);

    }




}
