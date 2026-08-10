package com.achraf.portfolio.service;

import com.achraf.portfolio.dto.SkillRequest;
import com.achraf.portfolio.dto.SkillResponse;
import com.achraf.portfolio.entity.Skill;
import com.achraf.portfolio.exception.ResourceNotFoundException;
import com.achraf.portfolio.mapper.SkillMapper;
import com.achraf.portfolio.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<SkillResponse> findAll() {
        return skillRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(SkillMapper::toResponse)
                .toList();
    }

    @Transactional
    public SkillResponse create(SkillRequest request) {
        Skill skill = Skill.builder()
                .name(request.name())
                .iconKey(request.iconKey())
                .displayOrder(request.displayOrder() != null ? request.displayOrder() : 0)
                .build();
        return SkillMapper.toResponse(skillRepository.save(skill));
    }

    @Transactional
    public SkillResponse update(Long id, SkillRequest request) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found: " + id));
        skill.setName(request.name());
        skill.setIconKey(request.iconKey());
        skill.setDisplayOrder(request.displayOrder() != null ? request.displayOrder() : skill.getDisplayOrder());
        return SkillMapper.toResponse(skill);
    }

    @Transactional
    public void delete(Long id) {
        if (!skillRepository.existsById(id)) {
            throw new ResourceNotFoundException("Skill not found: " + id);
        }
        skillRepository.deleteById(id);
    }
}
