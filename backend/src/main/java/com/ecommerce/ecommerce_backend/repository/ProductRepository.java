package com.ecommerce.ecommerce_backend.repository;

import com.ecommerce.ecommerce_backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = """
    SELECT * FROM ecommerce_schema.products 
    WHERE category_id = :categoryId 
    AND is_active = true 
    AND discount_price IS NOT NULL
    ORDER BY sell_count DESC 
    LIMIT 6
    """, nativeQuery = true)
    List<Product> findTop6ByCategoryOrderBySellCount(@Param("categoryId") Long categoryId);

    @Query(value = "SELECT * FROM ecommerce_schema.products WHERE is_active = true ORDER BY sell_count DESC LIMIT 1", nativeQuery = true)
    Product findMostPopular();
}

