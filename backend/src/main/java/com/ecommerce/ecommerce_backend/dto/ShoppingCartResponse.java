package com.ecommerce.ecommerce_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingCartResponse {
    private Long id;
    private int quantity;
    private Long productId;
    private String productName;
    private double unitPrice;
    private double totalPrice;
}