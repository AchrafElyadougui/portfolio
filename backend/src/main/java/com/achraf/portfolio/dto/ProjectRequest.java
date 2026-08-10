package com.achraf.portfolio.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record ProjectRequest(
        @NotBlank String title,
        @NotBlank String description,
        String dateRange,
        String imageUrl,
        String projectUrl,
        Integer displayOrder,
        List<String> tags
) {
}
