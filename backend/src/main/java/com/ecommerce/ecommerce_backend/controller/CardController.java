package com.ecommerce.ecommerce_backend.controller;

import com.ecommerce.ecommerce_backend.dto.CardRequest;
import com.ecommerce.ecommerce_backend.dto.CardResponse;
import com.ecommerce.ecommerce_backend.entity.Card;
import com.ecommerce.ecommerce_backend.service.CardService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/user/card")
public class CardController {

    private final CardService cardService;

    @GetMapping("/user/{userId}")
    public List<CardResponse> findAllByUserId(@PathVariable Long userId) {
        return cardService.findAllByUserId(userId);
    }

    @GetMapping("/{id}")
    public CardResponse findById(@PathVariable Long id) {
        return cardService.findById(id);
    }

    @PostMapping("/{userId}")
    public CardResponse save(@PathVariable Long userId, @RequestBody CardRequest request) {
        Card card = new Card();
        mapRequestToEntity(request, card);
        return cardService.save(userId, card);
    }

    @PutMapping("/{id}")
    public CardResponse update(@PathVariable Long id, @RequestBody CardRequest request) {
        Card card = new Card();
        mapRequestToEntity(request, card);
        return cardService.update(id, card);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        cardService.delete(id);
    }

    private void mapRequestToEntity(CardRequest request, Card card) {
        card.setCardNo(request.getCardNo());
        card.setExpireMonth(request.getExpireMonth());
        card.setExpireYear(request.getExpireYear());
        card.setNameOnCard(request.getNameOnCard());
    }
}