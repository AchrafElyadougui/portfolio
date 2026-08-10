package com.achraf.portfolio.mapper;

import com.achraf.portfolio.dto.BlogPostResponse;
import com.achraf.portfolio.entity.BlogPost;

public final class BlogPostMapper {

    private BlogPostMapper() {
    }

    public static BlogPostResponse toResponse(BlogPost post) {
        return new BlogPostResponse(
                post.getId(),
                post.getTitle(),
                post.getSlug(),
                post.getShortContent(),
                post.getFullContent(),
                post.getPublishedAt()
        );
    }
}
