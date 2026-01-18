package com.flowboard.app.controller;


import com.flowboard.app.entity.TaskColumn;
import com.flowboard.app.service.TaskColumnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/board")
public class TaskColumnController
{



    @Autowired
    TaskColumnService taskColumnService;



    //col controller
    @PostMapping("/column/{id}")
    public ResponseEntity<TaskColumn> createColumn(@RequestBody TaskColumn column, @PathVariable int id)
    {
        return taskColumnService.createColumn(column, id);
    }


    //task column controller
    @DeleteMapping("/{boardId}/{columnId}")
    public ResponseEntity<TaskColumn> deleteColumn(@PathVariable int boardId, @PathVariable int columnId)
    {
        return taskColumnService.deleteColumn(boardId, columnId);
    }



}
