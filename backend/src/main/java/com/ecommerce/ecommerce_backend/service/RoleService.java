package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.RoleResponse;
import com.ecommerce.ecommerce_backend.entity.Role;
import java.util.List;

public interface RoleService {
    RoleResponse findByAuthority(String authority);
    RoleResponse save(Role role);
    List<RoleResponse> findAll();

    Role findEntityByAuthority(String authority);
}