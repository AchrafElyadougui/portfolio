package com.achraf.portfolio.controller.admin;

import com.achraf.portfolio.dto.ContactMessageResponse;
import com.achraf.portfolio.service.ContactService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/contact-messages")
public class AdminContactController {

    private final ContactService contactService;

    public AdminContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping
    public List<ContactMessageResponse> findAll() {
        return contactService.findAll();
    }

    @PatchMapping("/{id}/read")
    public ContactMessageResponse markRead(@PathVariable Long id) {
        return contactService.markRead(id);
    }
}
