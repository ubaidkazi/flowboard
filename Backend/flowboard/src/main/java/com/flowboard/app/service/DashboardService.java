package com.flowboard.app.service;

import com.flowboard.app.dto.response.ProjectResponse;
import com.flowboard.app.dto.response.dashboard.*;
import com.flowboard.app.entity.*;
import com.flowboard.app.enums.ActivityType;
import com.flowboard.app.repository.ActivityEventRepository;
import com.flowboard.app.repository.CardRepo;
import com.flowboard.app.repository.ProjectRepo;
import com.flowboard.app.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class DashboardService
{

    @Autowired
    ProjectRepo projectRepo;


    @Autowired
    CardRepo cardRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    ActivityEventRepository activityEventRepository;


    public ResponseEntity<?> getDashboard(String userName)
    {
        User currentUser = userRepo.findByUsername(userName).orElseThrow(() -> new RuntimeException("User not found"));
        long userId = (long)currentUser.getId();
        LocalDate today = LocalDate.now();
        LocalDateTime startOfWeek = today.with(DayOfWeek.MONDAY).atStartOfDay();
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime currentWeekStart =
                now.toLocalDate()
                        .with(DayOfWeek.MONDAY)
                        .atStartOfDay();

        LocalDateTime previousWeekStart =
                currentWeekStart.minusWeeks(1);

        LocalDateTime previousPeriodEnd =
                now.minusWeeks(1);


        //Metrics
        long accessibleProjects = projectRepo.countAccessibleProjects(userId);
        long tasksDueToday = cardRepo.countTasksDueToday(userId, today);

        long taskCompletedThisWeek =
                activityEventRepository.countCompletedCardsForUserBetween(
                        userId,
                        ActivityType.CARD_COMPLETED,
                        startOfWeek,
                        now
                );


        //not used any more
        //long completedTasks = cardRepo.countCompletedTasksForUser(userId);
        long completedThisWeek =
                activityEventRepository.countCompletedCardsForUserBetween(
                        userId,
                        ActivityType.CARD_COMPLETED,
                        currentWeekStart,
                        now
                );

        long completedLastWeekSamePeriod =
                activityEventRepository.countCompletedCardsForUserBetween(
                        userId,
                        ActivityType.CARD_COMPLETED,
                        previousWeekStart,
                        previousPeriodEnd
                );

        Double completedTasksTrend =
                calculatePercentageTrend(
                        completedThisWeek,
                        completedLastWeekSamePeriod
                );


        long activeCollabortors = projectRepo.countActiveCollaborators(userId);

        List<DashboardTaskResponse> myTasks = getDashboardTasks(userId);
        List<RecentActivityResponse> recentActivities = getRecentActivities(userId);
        List<RecentProjectResponse> recentProjects = getRecentProjects(userId);


        DashboardSummaryResponse summaryResponse =  new DashboardSummaryResponse(accessibleProjects, tasksDueToday,taskCompletedThisWeek,completedTasksTrend, activeCollabortors);
        DashboardResponse response = new DashboardResponse(summaryResponse, myTasks, recentActivities, recentProjects);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    private Double calculatePercentageTrend(
            long current,
            long previous
    ) {
        if (previous == 0) {
            return null;
        }

        double percentage =
                ((double) (current - previous) / previous) * 100;

        return Math.round(percentage * 10.0) / 10.0;
    }




    private List<DashboardTaskResponse> getDashboardTasks(Long userId) {
        LocalDate today = LocalDate.now();
        LocalDate weekEnd = today.plusDays(7);

        Pageable taskLimit = PageRequest.of(0, 5);

        return cardRepo.findDashboardTasksForUser(
                        userId,
                        today,
                        weekEnd,
                        taskLimit
                )
                .stream()
                .map(card -> mapToDashboardTaskResponse(card, today))
                .toList();
    }


    private DashboardTaskResponse mapToDashboardTaskResponse(
            Card card,
            LocalDate today
    ) {

        List<TaskAssigneeResponse> assignees = card.getAssignedMembers()
                .stream()
                .map(user -> new TaskAssigneeResponse(
                        user.getId(),
                        user.getFullName()
                ))
                .toList();

        return new DashboardTaskResponse(
                card.getId(),
                card.getTitle(),
                card.getDescription(),
                card.getPriority(),
                card.getProgress(),
                card.getDueDate(),
                determineDueStatus(card.getDueDate(), today),
                assignees,
                card.getColumn().getBoard().getId()
        );
    }

    private String determineDueStatus(
            LocalDate dueDate,
            LocalDate today
    ) {
        if (dueDate == null) {
            return "NO_DUE_DATE";
        }

        if (dueDate.isBefore(today)) {
            return "OVERDUE";
        }

        if (dueDate.isEqual(today)) {
            return "DUE_TODAY";
        }

        return "DUE_SOON";
    }


    private List<RecentActivityResponse> getRecentActivities(Long userId) {
        Pageable activityLimit = PageRequest.of(0, 7);

        return activityEventRepository
                .findRecentActivityForUser(userId, activityLimit)
                .stream()
                .map(this::mapToRecentActivityResponse)
                .toList();
    }


    private RecentActivityResponse mapToRecentActivityResponse(
            ActivityEvent activity
    ) {
        return new RecentActivityResponse(
                activity.getId(),
                activity.getActorUserId(),
                activity.getActorName(),
                activity.getType().name(),
                getActivityActionText(activity.getType()),
                activity.getEntityName(),
                activity.getTargetUserId(),
                activity.getTargetUserName(),
                activity.getProjectId(),
                activity.getBoardId(),
                activity.getCardId(),
                activity.getOccurredAt()
        );
    }


    private String getActivityActionText(ActivityType type) {
        return switch (type) {
            case PROJECT_CREATED -> "created project";
            case PROJECT_UPDATED -> "updated project";

            case BOARD_CREATED -> "created board";
            case BOARD_UPDATED -> "updated board";

            case COLUMN_CREATED -> "created column";
            case COLUMN_UPDATED -> "updated column";
            case COLUMN_MOVED -> "moved column";
            case COLUMN_DELETED -> "deleted column";

            case CARD_CREATED -> "created task";
            case CARD_UPDATED -> "updated task";
            case CARD_STARTED -> "stared task";
            case CARD_MOVED -> "moved";
            case CARD_ASSIGNED -> "assigned";
            case CARD_UNASSIGNED -> "unassigned";
            case CARD_REASSIGNED -> "reassigned";
            case CARD_COMPLETED -> "completed";
            case CARD_REOPENED -> "reopened";
            case CARD_DELETED -> "deleted";

            case MEMBER_ADDED -> "added member";
            case MEMBER_REMOVED -> "removed member";
        };
    }


    private List<RecentProjectResponse> getRecentProjects(Long userId) {
        return projectRepo.findRecentProjectsForUser(
                userId,
                PageRequest.of(0, 6)
        );
    }











}
