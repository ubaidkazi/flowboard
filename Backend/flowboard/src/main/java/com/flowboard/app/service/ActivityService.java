package com.flowboard.app.service;


import com.flowboard.app.entity.*;
import com.flowboard.app.enums.ActivityType;
import com.flowboard.app.repository.ActivityEventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class ActivityService {

    private final ActivityEventRepository activityEventRepository;

    public ActivityService(
            ActivityEventRepository activityEventRepository
    ) {
        this.activityEventRepository = activityEventRepository;
    }

    @Transactional
    public void recordProjectCreated(
            Project project,
            User actor
    ) {
        ActivityEvent activity = createBaseActivity(
                ActivityType.PROJECT_CREATED,
                actor
        );

        setProjectDetails(activity, project);

        activity.setEntityName(project.getName());

        activityEventRepository.save(activity);
    }

    @Transactional
    public void recordProjectUpdated(
            Project project,
            User actor
    ) {
        ActivityEvent activity = createBaseActivity(
                ActivityType.PROJECT_UPDATED,
                actor
        );

        setProjectDetails(activity, project);

        activity.setEntityName(project.getName());

        activityEventRepository.save(activity);
    }

    @Transactional
    public void recordBoardCreated(
            Board board,
            User actor
    ) {
        ActivityEvent activity = createBaseActivity(
                ActivityType.BOARD_CREATED,
                actor
        );

        setBoardDetails(activity, board);

        activity.setEntityName(board.getName());

        activityEventRepository.save(activity);
    }

    @Transactional
    public void recordCardCreated(
            Card card,
            User actor
    ) {
        ActivityEvent activity = createBaseActivity(
                ActivityType.CARD_CREATED,
                actor
        );

        setCardDetails(activity, card);

        activity.setEntityName(card.getTitle());

        activityEventRepository.save(activity);
    }

    @Transactional
    public void recordCardAssigned(
            Card card,
            User assignedUser,
            User actor
    ) {
        ActivityEvent activity = createBaseActivity(
                ActivityType.CARD_ASSIGNED,
                actor
        );

        setCardDetails(activity, card);
        setTargetUserDetails(activity, assignedUser);

        activity.setEntityName(card.getTitle());

        activityEventRepository.save(activity);
    }

    @Transactional
    public void recordCardReassigned(
            Card card,
            User previousAssignee,
            User newAssignee,
            User actor
    ) {
        ActivityEvent activity = createBaseActivity(
                ActivityType.CARD_REASSIGNED,
                actor
        );

        setCardDetails(activity, card);
        setTargetUserDetails(activity, newAssignee);

        activity.setEntityName(card.getTitle());

        /*
         * Store the previous assignee if your entity supports metadata,
         * previousTargetUserId, or a JSON payload.
         */
        activity.setPreviousTargetUserId(
                previousAssignee != null
                        ? (long) previousAssignee.getId()
                        : null
        );

        activity.setPreviousTargetUserName(
                previousAssignee != null
                        ? getUserDisplayName(previousAssignee)
                        : null
        );

        activityEventRepository.save(activity);
    }

    @Transactional
    public void recordCardStarted(
            Card card,
            User actor
    ) {
        ActivityEvent activity = createBaseActivity(
                ActivityType.CARD_STARTED,
                actor
        );

        setCardDetails(activity, card);

        activity.setEntityName(card.getTitle());

        activityEventRepository.save(activity);
    }

    @Transactional
    public void recordCardCompleted(
            Card card,
            User actor
    ) {
        ActivityEvent activity = createBaseActivity(
                ActivityType.CARD_COMPLETED,
                actor
        );

        setCardDetails(activity, card);

        activity.setEntityName(card.getTitle());

        activityEventRepository.save(activity);
    }

    @Transactional
    public void recordCardReopened(
            Card card,
            User actor
    ) {
        ActivityEvent activity = createBaseActivity(
                ActivityType.CARD_REOPENED,
                actor
        );

        setCardDetails(activity, card);

        activity.setEntityName(card.getTitle());

        activityEventRepository.save(activity);
    }

    @Transactional
    public void recordCardUpdated(
            Card card,
            User actor
    ) {
        ActivityEvent activity = createBaseActivity(
                ActivityType.CARD_UPDATED,
                actor
        );

        setCardDetails(activity, card);
        activity.setEntityName(card.getTitle());

        activityEventRepository.save(activity);
    }


    @Transactional
    public void recordCardDeleted(
            Card card,
            User actor
    ) {
        ActivityEvent activity = createBaseActivity(
                ActivityType.CARD_DELETED,
                actor
        );

        /*
         * Call this before deleting the card so all relationships
         * are still available.
         */
        setCardDetails(activity, card);

        activity.setEntityName(card.getTitle());

        activityEventRepository.save(activity);
    }

    @Transactional
    public void recordMemberAdded(
            Project project,
            User addedMember,
            User actor
    ) {
        ActivityEvent activity = createBaseActivity(
                ActivityType.MEMBER_ADDED,
                actor
        );

        setProjectDetails(activity, project);
        setTargetUserDetails(activity, addedMember);

        /*
         * entityName represents the affected member for this event.
         */
        activity.setEntityName(getUserDisplayName(addedMember));

        activityEventRepository.save(activity);
    }

    @Transactional
    public void recordMemberRemoved(
            Project project,
            User removedMember,
            User actor
    ) {
        ActivityEvent activity = createBaseActivity(
                ActivityType.MEMBER_REMOVED,
                actor
        );

        setProjectDetails(activity, project);
        setTargetUserDetails(activity, removedMember);

        activity.setEntityName(getUserDisplayName(removedMember));

        activityEventRepository.save(activity);
    }

    private ActivityEvent createBaseActivity(
            ActivityType type,
            User actor
    ) {
        ActivityEvent activity = new ActivityEvent();

        activity.setType(type);
        activity.setActorUserId((long)actor.getId());
        activity.setActorName(getUserDisplayName(actor));
        activity.setOccurredAt(LocalDateTime.now());

        return activity;
    }

    private void setProjectDetails(
            ActivityEvent activity,
            Project project
    ) {
        activity.setProjectId(project.getId());
        activity.setProjectName(project.getName());
    }

    private void setBoardDetails(
            ActivityEvent activity,
            Board board
    ) {
        activity.setBoardId(board.getId());

        Project project = board.getProject();

        if (project != null) {
            setProjectDetails(activity, project);
        }
    }

    private void setColumnDetails(
            ActivityEvent activity,
            TaskColumn column
    ) {
        activity.setColumnId(column.getId());

        Board board = column.getBoard();

        if (board != null) {
            setBoardDetails(activity, board);
        }
    }

    private void setCardDetails(
            ActivityEvent activity,
            Card card
    ) {
        activity.setCardId(card.getId());

        TaskColumn column = card.getColumn();

        if (column != null) {
            setColumnDetails(activity, column);
        }
    }

    private void setTargetUserDetails(
            ActivityEvent activity,
            User targetUser
    ) {
        if (targetUser == null) {
            return;
        }

        activity.setTargetUserId((long)targetUser.getId());
        activity.setTargetUserName(
                getUserDisplayName(targetUser)
        );
    }

    private String getUserDisplayName(User user) {
        /*
         * Replace this with the getter used by your User entity.
         */
        return user.getFullName();
    }
}