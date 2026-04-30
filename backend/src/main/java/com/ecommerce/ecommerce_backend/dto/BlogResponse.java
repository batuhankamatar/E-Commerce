package com.ecommerce.ecommerce_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogResponse {
    private Long id;
    private String title;
    private String excerpt;
    private String content;
    private String image;
    private LocalDate date;
    private Integer commentCount;
    private Boolean isNew;
}