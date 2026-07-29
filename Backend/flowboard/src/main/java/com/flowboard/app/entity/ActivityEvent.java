package com.flowboard.app.entity;

import com.flowboard.app.enums.ActivityType;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(
        name = "activity_events",
        indexes = {
                @Index(
                        name = "idx_activity_project_occurred_at",
                        columnList = "project_id, occurred_at"
                ),
                @Index(
                        name = "idx_activity_actor",
                        columnList = "actor_user_id"
                )
        }
)
public class ActivityEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private ActivityType type;

    @Column(name = "project_id", nullable = false)
    private Long projectId;

    @Column(name = "board_id")
    private Long boardId;

    @Column(name = "column_id")
    private Long columnId;

    @Column(name = "card_id")
    private Long cardId;

    @Column(name = "actor_user_id", nullable = false)
    private Long actorUserId;

    @Column(name = "actor_name", nullable = false)
    private String actorName;

    @Column(name = "entity_name")
    private String entityName;

    @Column(name = "occurred_at", nullable = false)
    private LocalDateTime occurredAt;

    @Column(name = "previous_target_user_id")
    private Long previousTargetUserId;

    @Column(name = "previous_target_user_name")
    private String previousTargetUserName;

    @Column(name = "project_name")
    private String projectName;

    @Column(name = "target_user_id")
    private Long targetUserId;

    @Column(name = "target_user_name")
    private String targetUserName;


    //Users that are affected by the Activity Event
    @OneToMany(
            mappedBy = "activityEvent",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ActivityEventUser> affectedUsers = new ArrayList<>();




    public ActivityEvent() {
    }


}
