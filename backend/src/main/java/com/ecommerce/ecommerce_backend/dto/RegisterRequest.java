package com.ecommerce.ecommerce_backend.dto;

import com.ecommerce.ecommerce_backend.entity.Gender;
import lombok.Data;
import java.time.LocalDate;

@Data
public class RegisterRequest {
    private String name;
    private String surname;
    private String email;
    private String password;
    private Gender gender;
    private LocalDate birthDate;
    private String type;
    private String storeName;
    private String taxNo;
    private String bankAccount;
}