package com.achraf.portfolio.service;

import com.achraf.portfolio.dto.ProjectRequest;
import com.achraf.portfolio.dto.ProjectResponse;
import com.achraf.portfolio.entity.Project;
import com.achraf.portfolio.exception.ResourceNotFoundException;
import com.achraf.portfolio.mapper.ProjectMapper;
import com.achraf.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectResponse> findAll() {
        return projectRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(ProjectMapper::toResponse)
                .toList();
    }

    public ProjectResponse findById(Long id) {
        return ProjectMapper.toResponse(getOrThrow(id));
    }

    @Transactional
    public ProjectResponse create(ProjectRequest request) {
        Project project = Project.builder()
                .title(request.title())
                .description(request.description())
                .dateRange(request.dateRange())
                .imageUrl(request.imageUrl())
                .projectUrl(request.projectUrl())
                .displayOrder(request.displayOrder() != null ? request.displayOrder() : 0)
                .tags(request.tags() != null ? new ArrayList<>(request.tags()) : new ArrayList<>())
                .build();
        return ProjectMapper.toResponse(projectRepository.save(project));
    }

    @Transactional
    public ProjectResponse update(Long id, ProjectRequest request) {
        Project project = getOrThrow(id);
        project.setTitle(request.title());
        project.setDescription(request.description());
        project.setDateRange(request.dateRange());
        project.setImageUrl(request.imageUrl());
        project.setProjectUrl(request.projectUrl());
        project.setDisplayOrder(request.displayOrder() != null ? request.displayOrder() : project.getDisplayOrder());
        project.setTags(request.tags() != null ? new ArrayList<>(request.tags()) : new ArrayList<>());
        return ProjectMapper.toResponse(project);
    }

    @Transactional
    public void delete(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Project not found: " + id);
        }
        projectRepository.deleteById(id);
    }

    private Project getOrThrow(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found: " + id));
    }
}
