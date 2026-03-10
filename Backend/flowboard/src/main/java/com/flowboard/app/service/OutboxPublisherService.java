package com.flowboard.app.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flowboard.app.entity.OutboxEvent;
import com.flowboard.app.repository.OutboxRepository;
import com.flowboard.app.util.JsonUtils;
import com.flowboard.app.websocket.BoardEventPublisher;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OutboxPublisherService {

    private final OutboxRepository outboxRepo;
    private final BoardEventPublisher eventPublisher;

    private final ObjectMapper objectMapper;

    @Scheduled(fixedDelay = 1000)
    @Transactional
    public void publishOutboxEvents() {

        List<OutboxEvent> events = outboxRepo.findByProcessedFalse();

        for (OutboxEvent event : events) {
           Object payload = JsonUtils.fromJson(event.getPayload());
           String address = event.getTopic() + event.getDestinatonId();

            eventPublisher.publish(
                    address,
                    payload
            );
            event.setProcessed(true);
        }
    }
}