package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.OrderItemResponse;
import com.ecommerce.ecommerce_backend.entity.OrderItem;
import com.ecommerce.ecommerce_backend.exception.GlobalException;
import com.ecommerce.ecommerce_backend.repository.OrderItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {

    private final OrderItemRepository orderItemRepository;

    @Override
    public OrderItemResponse findById(Long id) {
        OrderItem item = orderItemRepository.findById(id)
                .orElseThrow(() -> new GlobalException("Sipariş kalemi bulunamadı!", HttpStatus.NOT_FOUND));
        return convertToResponse(item);
    }

    @Override
    public List<OrderItemResponse> findAllByOrderId(Long orderId) {
        return orderItemRepository.findAll().stream()
                .filter(item -> item.getOrder().getId().equals(orderId))
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderItem save(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    private OrderItemResponse convertToResponse(OrderItem item) {
        return new OrderItemResponse(
                item.getId(),
                item.getQuantity(),
                item.getPrice(),
                item.getProduct().getId(),
                item.getProduct().getName()
        );
    }
}