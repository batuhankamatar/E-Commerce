package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.BlogRequest;
import com.ecommerce.ecommerce_backend.dto.BlogResponse;

import java.util.List;

public interface BlogService {
    List<BlogResponse> findAll();
    BlogResponse findById(Long id);
    List<BlogResponse> findLatest3();
    BlogResponse save(BlogRequest request);
    BlogResponse update(Long id, BlogRequest request);
    void delete(Long id);
    BlogResponse updateImage(Long id, String fileName);
    List<BlogResponse> findAllSortedByDate();
}
