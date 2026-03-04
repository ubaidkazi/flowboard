package com.flowboard.app.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;


@Data
@Entity
@Table(name = "outbox_events")
public class OutboxEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventType;

    private String topic;

    //save boardId, projectId or destination for routing topics
    private Integer destinatonId;

    @Column(columnDefinition = "TEXT")
    private String payload;

    private Instant createdAt;

    private boolean processed = false;
}