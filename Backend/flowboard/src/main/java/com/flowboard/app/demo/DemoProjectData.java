package com.flowboard.app.demo;

import java.util.List;

public class DemoProjectData {

    private String projectName;
    private String projectDescription;
    private List<DemoBoardData> boards;


    public DemoProjectData(
            String projectName,
            String projectDescription,
            List<DemoBoardData> boards
    ) {
        this.projectName = projectName;
        this.projectDescription = projectDescription;
        this.boards = boards;
    }


    public String getProjectName() {
        return projectName;
    }

    public String getProjectDescription() {
        return projectDescription;
    }

    public List<DemoBoardData> getBoards() {
        return boards;
    }
}