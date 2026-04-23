package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.OrderResponse;
import com.ecommerce.ecommerce_backend.entity.Order;
import java.util.List;

public interface OrderService {
    List<OrderResponse> findAllByUserId(Long userId);
    OrderResponse findById(Long id);
    OrderResponse createOrder(Long userId, Long addressId);
    OrderResponse updateStatus(Long orderId, String status);
}