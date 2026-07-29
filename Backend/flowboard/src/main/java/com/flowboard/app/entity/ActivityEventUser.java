package com.flowboard.app.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
//ActivityEventUser is the user/users affected by the Activity Event.
public class ActivityEventUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "activity_event_id", nullable = false)
    private ActivityEvent activityEvent;

    private Long userId;

    private String userName;

    public ActivityEventUser() {
    }

    public ActivityEventUser(
            ActivityEvent activityEvent,
            Long userId,
            String userName
    ) {
        this.activityEvent = activityEvent;
        this.userId = userId;
        this.userName = userName;
    }

}