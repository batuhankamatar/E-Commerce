package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.OrderItemResponse;
import com.ecommerce.ecommerce_backend.entity.OrderItem;
import java.util.List;

public interface OrderItemService {
    OrderItemResponse findById(Long id);
    List<OrderItemResponse> findAllByOrderId(Long orderId);
    OrderItem save(OrderItem orderItem);
}