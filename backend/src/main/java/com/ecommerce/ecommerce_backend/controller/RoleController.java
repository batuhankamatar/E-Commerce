package com.ecommerce.ecommerce_backend.controller;

import com.ecommerce.ecommerce_backend.entity.Role;
import com.ecommerce.ecommerce_backend.service.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/roles")
public class RoleController {

    private final RoleService roleService;

    @GetMapping
    public List<Role> getAllRoles() {
        return roleService.findAll();
    }
}