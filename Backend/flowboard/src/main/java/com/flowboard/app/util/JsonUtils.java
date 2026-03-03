package com.flowboard.app.util;

import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtils {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    // Simple method to deserialize JSON into Object
    public static Object fromJson(String json) {
        try {
            return objectMapper.readValue(json, Object.class);
        } catch (Exception e) {
            //log here if needed
            System.err.println("Failed to deserialize JSON: " + e.getMessage());
            return null; // or throw a runtime exception if you prefer
        }
    }
}