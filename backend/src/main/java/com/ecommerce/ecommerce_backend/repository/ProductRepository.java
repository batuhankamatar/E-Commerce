package com.ecommerce.ecommerce_backend.repository;

import com.ecommerce.ecommerce_backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = """
    SELECT p.* FROM ecommerce_schema.products p
    LEFT JOIN ecommerce_schema.categories c ON p.category_id = c.id
    WHERE (:categoryParam IS NULL 
           OR CAST(p.category_id AS TEXT) = :categoryParam 
           OR LOWER(REPLACE(REPLACE(REPLACE(c.title, ' ', ''), '_', ''), '&', '')) = LOWER(REPLACE(REPLACE(REPLACE(:categoryParam, ' ', ''), '_', ''), '&', ''))
           OR LOWER(REPLACE(REPLACE(REPLACE(c.code, ' ', ''), '_', ''), '&', '')) = LOWER(REPLACE(REPLACE(REPLACE(:categoryParam, ' ', ''), '_', ''), '&', '')))
    AND p.is_active = true
    AND (:filter IS NULL OR p.name ILIKE CONCAT('%', :filter, '%') OR p.description ILIKE CONCAT('%', :filter, '%'))
    ORDER BY
        CASE WHEN :sort = 'price_asc' THEN p.price END ASC,
        CASE WHEN :sort = 'price_desc' THEN p.price END DESC,
        CASE WHEN :sort = 'rating' THEN p.rating END DESC,
        CASE WHEN :sort = 'popularity' THEN p.sell_count END DESC,
        CASE WHEN :sort = 'newest' THEN p.id END DESC,
        p.id DESC
    LIMIT :limit OFFSET :offset
    """, nativeQuery = true)
    List<Product> findShopProductsV2(
            @Param("categoryParam") String categoryParam,
            @Param("filter") String filter,
            @Param("sort") String sort,
            @Param("limit") int limit,
            @Param("offset") int offset
    );

    @Query(value = """
        SELECT COUNT(*) FROM ecommerce_schema.products p
        LEFT JOIN ecommerce_schema.categories c ON p.category_id = c.id
        WHERE (:categoryParam IS NULL 
               OR CAST(p.category_id AS TEXT) = :categoryParam 
               OR LOWER(REPLACE(REPLACE(REPLACE(c.title, ' ', ''), '_', ''), '&', '')) = LOWER(REPLACE(REPLACE(REPLACE(:categoryParam, ' ', ''), '_', ''), '&', ''))
               OR LOWER(REPLACE(REPLACE(REPLACE(c.code, ' ', ''), '_', ''), '&', '')) = LOWER(REPLACE(REPLACE(REPLACE(:categoryParam, ' ', ''), '_', ''), '&', '')))
        AND p.is_active = true
        AND (:filter IS NULL OR p.name ILIKE CONCAT('%', :filter, '%') OR p.description ILIKE CONCAT('%', :filter, '%'))
        """, nativeQuery = true)
    Long countShopProductsV2(
            @Param("categoryParam") String categoryParam,
            @Param("filter") String filter
    );

    @Query(value = "SELECT * FROM ecommerce_schema.products WHERE is_active = true AND discount_price IS NOT NULL AND discount_price < price ORDER BY (price - discount_price) DESC LIMIT 10", nativeQuery = true)
    List<Product> findDailyDeals();

    @Query(value = "SELECT * FROM ecommerce_schema.products WHERE category_id = :categoryId AND is_active = true AND discount_price IS NOT NULL ORDER BY sell_count DESC LIMIT 6", nativeQuery = true)
    List<Product> findTop6ByCategoryOrderBySellCount(@Param("categoryId") Long categoryId);

    @Query(value = "SELECT * FROM ecommerce_schema.products WHERE is_active = true ORDER BY sell_count DESC LIMIT 1", nativeQuery = true)
    Product findMostPopular();
}