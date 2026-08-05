package com.flowboard.app.demo;

import com.flowboard.app.entity.*;
import com.flowboard.app.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class DemoDataService {

    private final UserRepo userRepository;



    private static final String DEMO_EMAIL = "johndoe@flowboardapp.live";


    private final PasswordEncoder passwordEncoder;
    @Autowired
    ProjectRepo projectRepo;

    @Autowired
    BoardRepo boardRepo;

    @Autowired
    TaskColumnRepo taskColumnRepo;

    @Autowired
    CardRepo cardRepo;

    @Autowired
    UserRepo userRepo;





    private List<DemoProjectData> projectData = getDemoProjects();







    public void seed()
    {

        if(userRepository.existsByEmail(DEMO_EMAIL)) {
            return;
        }





        User demo = createDemoUser();

//        createProjects(demo);

    }


    private User createDemoUser() {

        User user = new User();

        user.setUsername("johndoe");

        user.setFullName("John Doe");

        user.setEmail(DEMO_EMAIL);

        user.setPasswordHash(
                passwordEncoder.encode("johndoe")
        );

        return userRepo.save(user);

    }






    private List<DemoProjectData> getDemoProjects() {

        return List.of(

                new DemoProjectData(
                        "Website Redesign",
                        "Complete redesign of the FlowBoard marketing website",

                        List.of(

                                new DemoBoardData(
                                        "Sprint 1",

                                        List.of(

                                                new DemoColumnData(
                                                        "To Do",

                                                        List.of(
                                                                "Create wireframes",
                                                                "Design homepage",
                                                                "Review competitor websites"
                                                        )
                                                ),


                                                new DemoColumnData(
                                                        "In Progress",

                                                        List.of(
                                                                "Implement landing page",
                                                                "Create navigation component"
                                                        )
                                                ),


                                                new DemoColumnData(
                                                        "Done",

                                                        List.of(
                                                                "Setup project structure",
                                                                "Create initial mockups"
                                                        )
                                                )

                                        )
                                )

                        )
                ),



                new DemoProjectData(
                        "Mobile Application",
                        "Build iOS and Android applications",

                        List.of(

                                new DemoBoardData(
                                        "Mobile Sprint",

                                        List.of(

                                                new DemoColumnData(
                                                        "Backlog",

                                                        List.of(
                                                                "Create login screen",
                                                                "Setup push notifications"
                                                        )
                                                ),


                                                new DemoColumnData(
                                                        "Development",

                                                        List.of(
                                                                "Implement authentication",
                                                                "Create user profile"
                                                        )
                                                ),


                                                new DemoColumnData(
                                                        "Completed",

                                                        List.of(
                                                                "Setup React Native project"
                                                        )
                                                )

                                        )
                                )

                        )
                )

        );
    }



    private List<Project> createProjects(User owner) {

        List<Project> projects = new ArrayList<>();


        for(DemoProjectData projectData : getDemoProjects()) {


            // CREATE PROJECT

            Project project = new Project();

            project.setName(
                    projectData.getProjectName()
            );

            project.setDescription(
                    projectData.getProjectDescription()
            );

            project.setOwner(owner);

            project.setTimeCreated(
                    Instant.now()
            );

            project.setTimeUpdated(
                    Instant.now()
            );


            projectRepo.save(project);



            // CREATE BOARDS

            for(DemoBoardData boardData : projectData.getBoards()) {


                Board board = new Board();

                board.setName(
                        boardData.getBoardName()
                );

                board.setProject(project);
                board.setUser(owner);


                boardRepo.save(board);



                // CREATE COLUMNS

                for(DemoColumnData columnData : boardData.getColumns()) {


                    TaskColumn column = new TaskColumn();

                    column.setName(
                            columnData.getColumnName()
                    );

                    column.setBoard(board);


                    taskColumnRepo.save(column);



                    // CREATE CARDS

                    for(String cardTitle : columnData.getCards()) {


                        Card card = new Card();

                        card.setTitle(cardTitle);

                        card.setColumn(column);


                        cardRepo.save(card);

                    }

                }

            }


            projects.add(project);

        }


        return projects;
    }










}