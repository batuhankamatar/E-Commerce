package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.OrderItemResponse;
import com.ecommerce.ecommerce_backend.dto.OrderResponse;
import com.ecommerce.ecommerce_backend.entity.*;
import com.ecommerce.ecommerce_backend.exception.GlobalException;
import com.ecommerce.ecommerce_backend.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserService userService;
    private final ShoppingCartService shoppingCartService;
    private final AddressService addressService;
    @Override
    public List<OrderResponse> findAllByUserId(Long userId) {
        return orderRepository.findAll().stream()
                .filter(o -> o.getUser().getId().equals(userId))
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse findById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new GlobalException("Sipariş bulunamadı!", HttpStatus.NOT_FOUND));
        return convertToResponse(order);
    }

    @Override
    @Transactional
    public OrderResponse createOrder(Long userId, Long addressId) {
        User user = userService.findEntityById(userId);
        Address address = addressService.findEntityById(addressId);

        List<ShoppingCart> cartItems = user.getCartItems();
        if (cartItems.isEmpty()) {
            throw new GlobalException("Boş sepetle sipariş verilemez!", HttpStatus.BAD_REQUEST);
        }

        Order order = new Order();
        order.setUser(user);
        order.setAddress(address);
        order.setStatus(Status.PENDING);

        double total = 0;
        List<OrderItem> orderItems = new ArrayList<>();

        for (ShoppingCart cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProduct().getPrice());
            orderItem.setOrder(order);

            orderItems.add(orderItem);
            total += (orderItem.getPrice() * orderItem.getQuantity());
        }

        order.setOrderItems(orderItems);
        order.setTotalPrice(total);

        Order savedOrder = orderRepository.save(order);

        shoppingCartService.clearCart(userId);

        return convertToResponse(savedOrder);
    }

    @Override
    public OrderResponse updateStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new GlobalException("Sipariş bulunamadı!", HttpStatus.NOT_FOUND));

        try {
            order.setStatus(Status.valueOf(status.toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new GlobalException("Geçersiz sipariş durumu!", HttpStatus.BAD_REQUEST);
        }

        return convertToResponse(orderRepository.save(order));
    }

    private OrderResponse convertToResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setOrderDate(order.getOrderDate());
        response.setTotalPrice(order.getTotalPrice());
        response.setStatus(order.getStatus());

        if (order.getAddress() != null) {
            response.setAddressDetail(order.getAddress().getTitle() + ": " +
                    order.getAddress().getCity() + "/" +
                    order.getAddress().getDistrict());
        }

        if (order.getOrderItems() != null) {
            List<OrderItemResponse> itemResponses = order.getOrderItems().stream()
                    .map(item -> new OrderItemResponse(
                            item.getId(),
                            item.getQuantity(),
                            item.getPrice(),
                            item.getProduct().getId(),
                            item.getProduct().getName()
                    ))
                    .collect(Collectors.toList());
            response.setItems(itemResponses);
        }

        return response;
    }
}