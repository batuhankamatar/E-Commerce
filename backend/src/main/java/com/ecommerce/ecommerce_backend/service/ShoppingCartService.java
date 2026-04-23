package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.ShoppingCartResponse;
import com.ecommerce.ecommerce_backend.entity.ShoppingCart;
import java.util.List;

public interface ShoppingCartService {
    List<ShoppingCartResponse> findByUserId(Long userId);
    ShoppingCartResponse addToCart(Long userId, Long productId, int quantity);
    ShoppingCartResponse updateQuantity(Long cartId, int quantity);
    void removeFromCart(Long cartId);
    void clearCart(Long userId);
}