package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.RoleResponse;
import com.ecommerce.ecommerce_backend.entity.Role;
import com.ecommerce.ecommerce_backend.exception.GlobalException;
import com.ecommerce.ecommerce_backend.repository.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    public RoleResponse findByAuthority(String authority) {
        Role role = findEntityByAuthority(authority);
        return new RoleResponse(role.getId(), role.getAuthority());
    }

    @Override
    public Role findEntityByAuthority(String authority) {
        return roleRepository.findByAuthority(authority)
                .orElseThrow(() -> new GlobalException("Role not found: " + authority, HttpStatus.NOT_FOUND));
    }

    @Override
    public RoleResponse save(Role role) {
        Role savedRole = roleRepository.save(role);
        return new RoleResponse(savedRole.getId(), savedRole.getAuthority());
    }

    @Override
    public List<RoleResponse> findAll() {
        return roleRepository.findAll().stream()
                .map(role -> new RoleResponse(role.getId(), role.getAuthority()))
                .collect(Collectors.toList());
    }
}