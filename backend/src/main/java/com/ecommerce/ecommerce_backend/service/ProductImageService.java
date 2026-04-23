package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.ProductImageResponse;
import com.ecommerce.ecommerce_backend.entity.ProductImage;
import java.util.List;

public interface ProductImageService {
    List<ProductImageResponse> findAllByProductId(Long productId);
    ProductImageResponse findById(Long id);
    ProductImage findEntityById(Long id);
    ProductImageResponse save(Long productId, ProductImage productImage);
    void delete(Long id);
}