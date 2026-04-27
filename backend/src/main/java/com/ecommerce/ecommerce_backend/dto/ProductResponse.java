package com.ecommerce.ecommerce_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Double discountPrice;
    private Integer stock;
    private int sellCount;
    private Double rating;
    private String mainImage;
    private Long categoryId;
    private String categoryName;
    private Long storeId;
    private String storeName;
    private List<String> imageUrls;
}