package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.ReviewRequest;
import com.ecommerce.ecommerce_backend.dto.ReviewResponse;

import java.util.List;

public interface ReviewService {
    List<ReviewResponse> findByProductId(Long productId);
    ReviewResponse save(Long productId, Long userId, ReviewRequest request);
}
