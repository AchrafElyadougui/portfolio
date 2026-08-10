package com.achraf.portfolio.dto;

import jakarta.validation.constraints.NotBlank;

import java.time.Instant;

public record BlogPostRequest(
        @NotBlank String title,
        @NotBlank String slug,
        @NotBlank String shortContent,
        @NotBlank String fullContent,
        Instant publishedAt
) {
}
