package com.ecommerce.ecommerce_backend.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserException.class)
    public ResponseEntity<UserErrorResponse> handleUserException(UserException ex) {
        UserErrorResponse error = new UserErrorResponse(ex.getStatus().value(), ex.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(error, ex.getStatus());
    }

    @ExceptionHandler(ProductException.class)
    public ResponseEntity<ProductErrorResponse> handleProductException(ProductException ex) {
        ProductErrorResponse error = new ProductErrorResponse(ex.getStatus().value(), ex.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(error, ex.getStatus());
    }

    @ExceptionHandler(OrderException.class)
    public ResponseEntity<OrderErrorResponse> handleOrderException(OrderException ex) {
        OrderErrorResponse error = new OrderErrorResponse(ex.getStatus().value(), ex.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(error, ex.getStatus());
    }

    @ExceptionHandler(CategoryException.class)
    public ResponseEntity<CategoryErrorResponse> handleCategoryException(CategoryException ex) {
        CategoryErrorResponse error = new CategoryErrorResponse(ex.getStatus().value(), ex.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(error, ex.getStatus());
    }

    @ExceptionHandler(AddressException.class)
    public ResponseEntity<AddressErrorResponse> handleAddressException(AddressException ex) {
        AddressErrorResponse error = new AddressErrorResponse(ex.getStatus().value(), ex.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(error, ex.getStatus());
    }

    @ExceptionHandler(ShoppingCartException.class)
    public ResponseEntity<ShoppingCartErrorResponse> handleShoppingCartException(ShoppingCartException ex) {
        ShoppingCartErrorResponse error = new ShoppingCartErrorResponse(ex.getStatus().value(), ex.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(error, ex.getStatus());
    }

    @ExceptionHandler(GlobalException.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(GlobalException ex) {
        ErrorResponse error = new ErrorResponse(ex.getStatus().value(), ex.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(error, ex.getStatus());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception ex) {
        ErrorResponse error = new ErrorResponse(500, "Beklenmedik bir hata oluştu: " + ex.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(error, org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(StoreException.class)
    public ResponseEntity<StoreErrorResponse> handleStoreException(StoreException ex) {
        StoreErrorResponse error = new StoreErrorResponse(
                ex.getStatus().value(),
                ex.getMessage(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(error, ex.getStatus());
    }
}