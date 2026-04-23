package com.ecommerce.ecommerce_backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ShoppingCartException extends RuntimeException {
    private final HttpStatus status;

    public ShoppingCartException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}