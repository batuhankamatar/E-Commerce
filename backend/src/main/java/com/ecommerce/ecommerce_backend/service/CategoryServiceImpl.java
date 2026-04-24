package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.CategoryResponse;
import com.ecommerce.ecommerce_backend.entity.Category;
import com.ecommerce.ecommerce_backend.exception.CategoryException;
import com.ecommerce.ecommerce_backend.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryResponse> findAll() {
        return categoryRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponse findById(Long id) {
        return convertToResponse(findEntityById(id));
    }

    @Override
    public Category findEntityById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryException("Kategori bulunamadı! ID: " + id, HttpStatus.NOT_FOUND));
    }

    @Override
    public CategoryResponse save(Category category) {
        return convertToResponse(categoryRepository.save(category));
    }

    @Override
    public CategoryResponse update(Long id, Category categoryDetails) {
        Category existingCategory = findEntityById(id);

        existingCategory.setTitle(categoryDetails.getTitle());
        existingCategory.setCode(categoryDetails.getCode());
        existingCategory.setImg(categoryDetails.getImg());
        existingCategory.setGender(categoryDetails.getGender());

        return convertToResponse(categoryRepository.save(existingCategory));
    }

    @Override
    public void delete(Long id) {
        Category category = findEntityById(id);
        categoryRepository.delete(category);
    }

    private CategoryResponse convertToResponse(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getCode(),
                category.getTitle(),
                category.getImg(),
                category.calculateAverageRating(),
                category.getGender(),
                category.getProducts() != null ? category.getProducts().size() : 0
        );
    }
}