package com.flowboard.app.demo;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DemoDataSeeder implements CommandLineRunner {

    private final DemoDataService demoDataService;

    @Override
    public void run(String... args) {

        demoDataService.seed();

    }

}