package com.achraf.portfolio.repository;

import com.achraf.portfolio.entity.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    List<BlogPost> findAllByOrderByPublishedAtDesc();
    Optional<BlogPost> findBySlug(String slug);
    boolean existsBySlug(String slug);
}
