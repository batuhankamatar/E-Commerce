package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.RegisterRequest;
import com.ecommerce.ecommerce_backend.entity.User;

public interface AuthService {
    User register(RegisterRequest registerRequest);
    User login(String email, String password);
}