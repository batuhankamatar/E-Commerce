package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.CategoryResponse;
import com.ecommerce.ecommerce_backend.entity.Category;
import java.util.List;

public interface CategoryService {
    List<CategoryResponse> findAll();
    CategoryResponse findById(Long id);
    Category findEntityById(Long id);
    CategoryResponse save(Category category);
    CategoryResponse update(Long id, Category category);
    void delete(Long id);
}