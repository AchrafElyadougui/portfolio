package com.achraf.portfolio.mapper;

import com.achraf.portfolio.dto.SkillResponse;
import com.achraf.portfolio.entity.Skill;

public final class SkillMapper {

    private SkillMapper() {
    }

    public static SkillResponse toResponse(Skill skill) {
        return new SkillResponse(
                skill.getId(),
                skill.getName(),
                skill.getIconKey(),
                skill.getDisplayOrder()
        );
    }
}
