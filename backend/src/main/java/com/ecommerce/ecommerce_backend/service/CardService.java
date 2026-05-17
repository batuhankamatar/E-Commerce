package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.CardResponse;
import com.ecommerce.ecommerce_backend.entity.Card;
import java.util.List;

public interface CardService {
    List<CardResponse> findAllByUserId(Long userId);
    CardResponse findById(Long id);
    Card findEntityById(Long id);
    CardResponse save(Long userId, Card card);
    CardResponse update(Long id, Card cardDetails);
    void delete(Long id);
}