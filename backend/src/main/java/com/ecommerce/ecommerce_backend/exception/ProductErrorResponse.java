package com.ecommerce.ecommerce_backend.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ProductErrorResponse {
    private int status;
    private String message;
    private LocalDateTime timestamp;
}