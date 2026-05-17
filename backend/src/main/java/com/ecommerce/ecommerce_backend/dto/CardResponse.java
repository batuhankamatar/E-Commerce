package com.ecommerce.ecommerce_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardResponse {
    private Long id;
    private String card_no;
    private Integer expire_month;
    private Integer expire_year;
    private String name_on_card;
}