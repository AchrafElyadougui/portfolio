package com.achraf.portfolio.dto;

public record LoginResponse(
        String token,
        long expiresInMs
) {
}
