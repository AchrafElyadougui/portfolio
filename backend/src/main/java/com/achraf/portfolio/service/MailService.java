package com.achraf.portfolio.service;

import com.achraf.portfolio.config.ContactProperties;
import com.achraf.portfolio.entity.ContactMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private static final Logger log = LoggerFactory.getLogger(MailService.class);

    private final JavaMailSender mailSender;
    private final ContactProperties contactProperties;

    public MailService(JavaMailSender mailSender, ContactProperties contactProperties) {
        this.mailSender = mailSender;
        this.contactProperties = contactProperties;
    }

    @Async
    public void notifyNewContactMessage(ContactMessage message) {
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(contactProperties.notifyTo());
            mail.setSubject("Portfolio contact form: " + message.getName());
            mail.setText("""
                    New message from your portfolio contact form.

                    Name: %s
                    Email: %s

                    %s
                    """.formatted(message.getName(), message.getEmail(), message.getMessage()));
            mailSender.send(mail);
        } catch (Exception e) {
            log.error("Failed to send contact notification email for message id={}", message.getId(), e);
        }
    }
}
