package com.achraf.portfolio.dto;

import java.util.List;

public record ProjectResponse(
        Long id,
        String title,
        String description,
        String dateRange,
        String imageUrl,
        String projectUrl,
        Integer displayOrder,
        List<String> tags
) {
}
