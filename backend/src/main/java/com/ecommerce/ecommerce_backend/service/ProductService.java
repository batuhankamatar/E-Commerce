package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.BestsellerProductResponse;
import com.ecommerce.ecommerce_backend.dto.ProductRequest;
import com.ecommerce.ecommerce_backend.dto.ProductResponse;
import com.ecommerce.ecommerce_backend.dto.ShopResponse;
import com.ecommerce.ecommerce_backend.entity.Product;
import java.util.List;

public interface ProductService {
    List<ProductResponse> findAll();
    ProductResponse findById(Long id);
    Product findEntityById(Long id);
    ProductResponse save(Product product, Long categoryId, Long storeId);
    ProductResponse update(Long id, ProductRequest productRequest, Long storeId);
    void delete(Long id);
    void updateProductImage(Long id, String fileName);
    List<BestsellerProductResponse> findTop6ByCategoryId(Long categoryId);
    ProductResponse findMostPopular();
    ShopResponse findShopProducts(String categoryCode, String sort, Double minPrice, Double maxPrice, int page, int size);
}