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

    @Query(value = """
    SELECT p.* FROM ecommerce_schema.products p
    JOIN ecommerce_schema.categories c ON p.category_id = c.id
    WHERE (:categoryCode IS NULL OR c.code = :categoryCode)
    AND p.is_active = true
    AND (:minPrice IS NULL OR p.price >= :minPrice)
    AND (:maxPrice IS NULL OR p.price <= :maxPrice)
    ORDER BY
        CASE WHEN :sort = 'price_asc' THEN p.price END ASC,
        CASE WHEN :sort = 'price_desc' THEN p.price END DESC,
        CASE WHEN :sort = 'rating' THEN p.rating END DESC,
        CASE WHEN :sort = 'newest' THEN p.id END DESC,
        p.sell_count DESC
    LIMIT :size OFFSET :offset
    """, nativeQuery = true)
    List<Product> findShopProducts(
            @Param("categoryCode") String categoryCode,
            @Param("sort") String sort,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("size") int size,
            @Param("offset") int offset
    );

    @Query(value = """
    SELECT COUNT(*) FROM ecommerce_schema.products p
    JOIN ecommerce_schema.categories c ON p.category_id = c.id
    WHERE (:categoryCode IS NULL OR c.code = :categoryCode)
    AND p.is_active = true
    AND (:minPrice IS NULL OR p.price >= :minPrice)
    AND (:maxPrice IS NULL OR p.price <= :maxPrice)
    """, nativeQuery = true)
    Long countShopProducts(
            @Param("categoryCode") String categoryCode,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice
    );
}

