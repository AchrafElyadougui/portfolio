package com.achraf.portfolio.security;

import com.achraf.portfolio.config.AdminProperties;
import com.achraf.portfolio.entity.AdminUser;
import com.achraf.portfolio.repository.AdminUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Seeds the single admin account from ADMIN_USERNAME / ADMIN_PASSWORD env vars
 * on first boot. No-op once an admin_user row already exists.
 */
@Component
public class AdminSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminSeeder.class);

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final AdminProperties adminProperties;

    public AdminSeeder(AdminUserRepository adminUserRepository,
                        PasswordEncoder passwordEncoder,
                        AdminProperties adminProperties) {
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.adminProperties = adminProperties;
    }

    @Override
    public void run(String... args) {
        if (adminUserRepository.count() > 0) {
            return;
        }
        if (adminProperties.password() == null || adminProperties.password().isBlank()) {
            log.warn("No admin_user exists yet and ADMIN_PASSWORD is not set — skipping admin seed. " +
                    "Set ADMIN_USERNAME/ADMIN_PASSWORD env vars and restart to create the admin account.");
            return;
        }

        AdminUser admin = AdminUser.builder()
                .username(adminProperties.username())
                .passwordHash(passwordEncoder.encode(adminProperties.password()))
                .build();
        adminUserRepository.save(admin);
        log.info("Seeded admin user '{}'", admin.getUsername());
    }
}
