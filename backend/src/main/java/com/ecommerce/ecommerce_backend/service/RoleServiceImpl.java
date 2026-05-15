package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.entity.Role;
import com.ecommerce.ecommerce_backend.repository.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }
}