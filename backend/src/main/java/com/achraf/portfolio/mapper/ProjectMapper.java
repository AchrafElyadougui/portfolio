package com.achraf.portfolio.mapper;

import com.achraf.portfolio.dto.ProjectResponse;
import com.achraf.portfolio.entity.Project;

public final class ProjectMapper {

    private ProjectMapper() {
    }

    public static ProjectResponse toResponse(Project project) {
        return new ProjectResponse(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getDateRange(),
                project.getImageUrl(),
                project.getProjectUrl(),
                project.getDisplayOrder(),
                project.getTags()
        );
    }
}
