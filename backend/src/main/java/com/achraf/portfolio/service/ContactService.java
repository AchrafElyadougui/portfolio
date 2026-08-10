package com.achraf.portfolio.service;

import com.achraf.portfolio.dto.ContactMessageResponse;
import com.achraf.portfolio.dto.ContactRequest;
import com.achraf.portfolio.entity.ContactMessage;
import com.achraf.portfolio.exception.ResourceNotFoundException;
import com.achraf.portfolio.mapper.ContactMessageMapper;
import com.achraf.portfolio.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;
    private final MailService mailService;

    public ContactService(ContactMessageRepository contactMessageRepository, MailService mailService) {
        this.contactMessageRepository = contactMessageRepository;
        this.mailService = mailService;
    }

    @Transactional
    public ContactMessageResponse submit(ContactRequest request) {
        ContactMessage message = ContactMessage.builder()
                .name(request.name())
                .email(request.email())
                .message(request.message())
                .build();
        ContactMessage saved = contactMessageRepository.save(message);
        mailService.notifyNewContactMessage(saved);
        return ContactMessageMapper.toResponse(saved);
    }

    public List<ContactMessageResponse> findAll() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(ContactMessageMapper::toResponse)
                .toList();
    }

    @Transactional
    public ContactMessageResponse markRead(Long id) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact message not found: " + id));
        message.setRead(true);
        return ContactMessageMapper.toResponse(message);
    }
}
