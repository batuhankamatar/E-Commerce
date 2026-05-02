package com.ecommerce.ecommerce_backend.controller;

import com.ecommerce.ecommerce_backend.dto.ReviewRequest;
import com.ecommerce.ecommerce_backend.dto.ReviewResponse;
import com.ecommerce.ecommerce_backend.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews") @AllArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/product/{productId}")
    public List<ReviewResponse> getByProduct(@PathVariable Long productId) {
        return reviewService.findByProductId(productId);
    }

    @PostMapping("/product/{productId}")
    public ReviewResponse save(@PathVariable Long productId,
                               @RequestParam(required = false) Long userId,
                               @RequestBody ReviewRequest request) {
        return reviewService.save(productId, userId, request);
    }
}
