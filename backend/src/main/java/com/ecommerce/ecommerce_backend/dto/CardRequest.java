package com.ecommerce.ecommerce_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardRequest {
    private String cardNo;
    private Integer expireMonth;
    private Integer expireYear;
    private String nameOnCard;
}