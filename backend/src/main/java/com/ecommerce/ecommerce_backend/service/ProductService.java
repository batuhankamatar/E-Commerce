package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.ProductResponse;
import com.ecommerce.ecommerce_backend.entity.Product;
import java.util.List;

public interface ProductService {
    List<ProductResponse> findAll();
    ProductResponse findById(Long id);
    Product findEntityById(Long id);
    ProductResponse save(Product product, Long categoryId);
    ProductResponse update(Long id, Product product);
    void delete(Long id);
}