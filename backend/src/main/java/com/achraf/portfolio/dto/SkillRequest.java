package com.achraf.portfolio.dto;

import jakarta.validation.constraints.NotBlank;

public record SkillRequest(
        @NotBlank String name,
        @NotBlank String iconKey,
        Integer displayOrder
) {
}
