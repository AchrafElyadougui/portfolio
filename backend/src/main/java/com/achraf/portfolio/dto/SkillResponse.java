package com.achraf.portfolio.dto;

public record SkillResponse(
        Long id,
        String name,
        String iconKey,
        Integer displayOrder
) {
}
