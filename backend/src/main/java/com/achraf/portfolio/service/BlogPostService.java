package com.achraf.portfolio.service;

import com.achraf.portfolio.dto.BlogPostRequest;
import com.achraf.portfolio.dto.BlogPostResponse;
import com.achraf.portfolio.entity.BlogPost;
import com.achraf.portfolio.exception.ResourceNotFoundException;
import com.achraf.portfolio.mapper.BlogPostMapper;
import com.achraf.portfolio.repository.BlogPostRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class BlogPostService {

    private final BlogPostRepository blogPostRepository;

    public BlogPostService(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    public List<BlogPostResponse> findAll() {
        return blogPostRepository.findAllByOrderByPublishedAtDesc().stream()
                .map(BlogPostMapper::toResponse)
                .toList();
    }

    public BlogPostResponse findBySlug(String slug) {
        return blogPostRepository.findBySlug(slug)
                .map(BlogPostMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found: " + slug));
    }

    @Transactional
    public BlogPostResponse create(BlogPostRequest request) {
        BlogPost post = BlogPost.builder()
                .title(request.title())
                .slug(request.slug())
                .shortContent(request.shortContent())
                .fullContent(request.fullContent())
                .publishedAt(request.publishedAt())
                .build();
        return BlogPostMapper.toResponse(blogPostRepository.save(post));
    }

    @Transactional
    public BlogPostResponse update(Long id, BlogPostRequest request) {
        BlogPost post = blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found: " + id));
        post.setTitle(request.title());
        post.setSlug(request.slug());
        post.setShortContent(request.shortContent());
        post.setFullContent(request.fullContent());
        if (request.publishedAt() != null) {
            post.setPublishedAt(request.publishedAt());
        }
        return BlogPostMapper.toResponse(post);
    }

    @Transactional
    public void delete(Long id) {
        if (!blogPostRepository.existsById(id)) {
            throw new ResourceNotFoundException("Blog post not found: " + id);
        }
        blogPostRepository.deleteById(id);
    }
}
