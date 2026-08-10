package com.achraf.portfolio.mapper;

import com.achraf.portfolio.dto.ContactMessageResponse;
import com.achraf.portfolio.entity.ContactMessage;

public final class ContactMessageMapper {

    private ContactMessageMapper() {
    }

    public static ContactMessageResponse toResponse(ContactMessage message) {
        return new ContactMessageResponse(
                message.getId(),
                message.getName(),
                message.getEmail(),
                message.getMessage(),
                message.isRead(),
                message.getCreatedAt()
        );
    }
}
