package com.achraf.portfolio.dto;

import java.time.Instant;

public record BlogPostResponse(
        Long id,
        String title,
        String slug,
        String shortContent,
        String fullContent,
        Instant publishedAt
) {
}
