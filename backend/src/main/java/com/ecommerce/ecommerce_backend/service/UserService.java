package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.UserResponse;
import com.ecommerce.ecommerce_backend.entity.User;
import java.util.List;

public interface UserService {
    List<UserResponse> findAll();
    UserResponse findById(Long id);
    User findEntityById(Long id);
    UserResponse update(Long id, User user);
    void delete(Long id);
}