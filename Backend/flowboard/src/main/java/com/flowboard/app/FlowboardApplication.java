package com.flowboard.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FlowboardApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlowboardApplication.class, args);
	}

}
