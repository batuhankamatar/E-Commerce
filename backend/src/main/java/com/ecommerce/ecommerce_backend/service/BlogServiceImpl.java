package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.BlogRequest;
import com.ecommerce.ecommerce_backend.dto.BlogResponse;
import com.ecommerce.ecommerce_backend.entity.Blog;
import com.ecommerce.ecommerce_backend.repository.BlogRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;

    @Override
    public List<BlogResponse> findAll() {
        return blogRepository.findAll().stream()
                .map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public BlogResponse findById(Long id) {
        return toResponse(getEntity(id));
    }

    @Override
    public List<BlogResponse> findLatest3() {
        return blogRepository.findTop3ByOrderByDateDesc().stream()
                .map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public BlogResponse save(BlogRequest request) {
        Blog blog = new Blog();
        blog.setTitle(request.getTitle());
        blog.setExcerpt(request.getExcerpt());
        blog.setContent(request.getContent());
        return toResponse(blogRepository.save(blog));
    }

    @Override
    public BlogResponse update(Long id, BlogRequest request) {
        Blog blog = getEntity(id);
        blog.setTitle(request.getTitle());
        blog.setExcerpt(request.getExcerpt());
        blog.setContent(request.getContent());
        return toResponse(blogRepository.save(blog));
    }

    @Override
    public void delete(Long id) {
        blogRepository.delete(getEntity(id));
    }

    @Override
    public BlogResponse updateImage(Long id, String fileName) {
        Blog blog = getEntity(id);
        blog.setImage(fileName);
        return toResponse(blogRepository.save(blog));
    }

    private Blog getEntity(Long id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog bulunamadı: " + id));
    }

    private BlogResponse toResponse(Blog blog) {
        BlogResponse r = new BlogResponse();
        r.setId(blog.getId());
        r.setTitle(blog.getTitle());
        r.setExcerpt(blog.getExcerpt());
        r.setContent(blog.getContent());
        r.setImage(blog.getImage());
        r.setDate(blog.getDate());
        r.setCommentCount(blog.getCommentCount());
        r.setIsNew(blog.getIsNew());
        return r;
    }

    @Override
    public List<BlogResponse> findAllSortedByDate() {
        return blogRepository.findAllByOrderByDateDesc().stream()
                .map(this::toResponse).collect(Collectors.toList());
    }
}