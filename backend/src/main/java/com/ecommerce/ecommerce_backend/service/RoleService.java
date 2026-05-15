package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.entity.Role;
import java.util.List;

public interface RoleService {
    List<Role> findAll();
}