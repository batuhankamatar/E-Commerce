package com.ecommerce.ecommerce_backend.controller;

import com.ecommerce.ecommerce_backend.dto.ShoppingCartRequest;
import com.ecommerce.ecommerce_backend.dto.ShoppingCartResponse;
import com.ecommerce.ecommerce_backend.service.ShoppingCartService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/cart")
public class ShoppingCartController {

    private final ShoppingCartService shoppingCartService;

    @GetMapping("/{userId}")
    public List<ShoppingCartResponse> getCart(@PathVariable Long userId) {
        return shoppingCartService.findByUserId(userId);
    }

    @PostMapping("/{userId}")
    public ShoppingCartResponse addToCart(@PathVariable Long userId,
                                          @RequestBody ShoppingCartRequest request) {
        return shoppingCartService.addToCart(userId, request.getProductId(), request.getQuantity());
    }

    @PutMapping("/{cartId}")
    public ShoppingCartResponse updateQuantity(@PathVariable Long cartId,
                                               @RequestParam int quantity) {
        return shoppingCartService.updateQuantity(cartId, quantity);
    }

    @DeleteMapping("/{cartId}")
    public void removeFromCart(@PathVariable Long cartId) {
        shoppingCartService.removeFromCart(cartId);
    }

    @DeleteMapping("/clear/{userId}")
    public void clearCart(@PathVariable Long userId) {
        shoppingCartService.clearCart(userId);
    }
}