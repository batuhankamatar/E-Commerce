package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.CardResponse;
import com.ecommerce.ecommerce_backend.entity.Card;
import com.ecommerce.ecommerce_backend.entity.User;
import com.ecommerce.ecommerce_backend.exception.GlobalException;
import com.ecommerce.ecommerce_backend.repository.CardRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CardServiceImpl implements CardService {

    private final CardRepository cardRepository;
    private final UserService userService;

    @Override
    public List<CardResponse> findAllByUserId(Long userId) {
        return cardRepository.findAll().stream()
                .filter(card -> card.getUser() != null && card.getUser().getId() != null && card.getUser().getId().equals(userId))
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CardResponse findById(Long id) {
        return convertToResponse(findEntityById(id));
    }

    @Override
    public Card findEntityById(Long id) {
        return cardRepository.findById(id)
                .orElseThrow(() -> new GlobalException("Kart bulunamadı! ID: " + id, HttpStatus.NOT_FOUND));
    }

    @Override
    public CardResponse save(Long userId, Card card) {
        User user = userService.findEntityById(userId);
        card.setUser(user);
        return convertToResponse(cardRepository.save(card));
    }

    @Override
    public CardResponse update(Long id, Card cardDetails) {
        Card existingCard = findEntityById(id);

        existingCard.setCardNo(cardDetails.getCardNo());
        existingCard.setExpireMonth(cardDetails.getExpireMonth());
        existingCard.setExpireYear(cardDetails.getExpireYear());
        existingCard.setNameOnCard(cardDetails.getNameOnCard());

        return convertToResponse(cardRepository.save(existingCard));
    }

    @Override
    public void delete(Long id) {
        Card card = findEntityById(id);
        cardRepository.delete(card);
    }

    private CardResponse convertToResponse(Card card) {
        return new CardResponse(
                card.getId(),
                card.getCardNo(),
                card.getExpireMonth(),
                card.getExpireYear(),
                card.getNameOnCard()
        );
    }
}