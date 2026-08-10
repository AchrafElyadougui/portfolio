package com.achraf.portfolio.controller;

import com.achraf.portfolio.dto.BlogPostResponse;
import com.achraf.portfolio.service.BlogPostService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/blog")
public class BlogController {

    private final BlogPostService blogPostService;

    public BlogController(BlogPostService blogPostService) {
        this.blogPostService = blogPostService;
    }

    @GetMapping
    public List<BlogPostResponse> findAll() {
        return blogPostService.findAll();
    }

    @GetMapping("/{slug}")
    public BlogPostResponse findBySlug(@PathVariable String slug) {
        return blogPostService.findBySlug(slug);
    }
}
