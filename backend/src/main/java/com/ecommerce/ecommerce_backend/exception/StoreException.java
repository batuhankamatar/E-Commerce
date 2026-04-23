package com.ecommerce.ecommerce_backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class StoreException extends RuntimeException {
    private final HttpStatus status;

    public StoreException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}