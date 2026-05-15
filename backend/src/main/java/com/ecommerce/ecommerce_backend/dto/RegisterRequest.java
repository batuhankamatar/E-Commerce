package com.ecommerce.ecommerce_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String name;
    private String surname;
    private String email;
    private String password;
    private Long roleId;
    private String gender;
    private String birthDate;
    private StoreRequest store;
}