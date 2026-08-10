package com.achraf.portfolio.dto;

import java.time.Instant;

public record ContactMessageResponse(
        Long id,
        String name,
        String email,
        String message,
        boolean read,
        Instant createdAt
) {
}
