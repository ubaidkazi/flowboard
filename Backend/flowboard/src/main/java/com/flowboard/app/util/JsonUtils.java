package com.flowboard.app.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

public class JsonUtils {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    static {
        // Register module to handle java.time.* types like Instant
        objectMapper.registerModule(new JavaTimeModule());
        // Optional: serialize dates as ISO strings, not timestamps
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }

    public static String toJson(Object obj) {
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            System.err.println("Failed to serialize object to JSON: " + e.getMessage());
            throw new RuntimeException("Failed to serialize object to JSON", e);
        }
    }

    public static Object fromJson(String json) {
        try {
            return objectMapper.readValue(json, Object.class);
        } catch (Exception e) {
            System.err.println("Failed to deserialize JSON: " + e.getMessage());
            throw new RuntimeException("Failed to deserialize JSON", e);
        }
    }
}