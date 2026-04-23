package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.ShoppingCartResponse;
import com.ecommerce.ecommerce_backend.entity.Product;
import com.ecommerce.ecommerce_backend.entity.ShoppingCart;
import com.ecommerce.ecommerce_backend.entity.User;
import com.ecommerce.ecommerce_backend.exception.ShoppingCartException;
import com.ecommerce.ecommerce_backend.repository.ShoppingCartRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ShoppingCartServiceImpl implements ShoppingCartService {

    private final ShoppingCartRepository shoppingCartRepository;
    private final UserService userService;
    private final ProductService productService;

    @Override
    public List<ShoppingCartResponse> findByUserId(Long userId) {
        return shoppingCartRepository.findByUserId(userId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ShoppingCartResponse addToCart(Long userId, Long productId, int quantity) {
        List<ShoppingCart> userCart = shoppingCartRepository.findByUserId(userId);

        for (ShoppingCart item : userCart) {
            if (item.getProduct().getId().equals(productId)) {
                item.setQuantity(item.getQuantity() + quantity);
                return convertToResponse(shoppingCartRepository.save(item));
            }
        }

        ShoppingCart newEntry = new ShoppingCart();
        User user = userService.findEntityById(userId);
        Product product = productService.findEntityById(productId);

        newEntry.setUser(user);
        newEntry.setProduct(product);
        newEntry.setQuantity(quantity);

        return convertToResponse(shoppingCartRepository.save(newEntry));
    }

    @Override
    public ShoppingCartResponse updateQuantity(Long cartId, int quantity) {
        ShoppingCart cartItem = shoppingCartRepository.findById(cartId)
                .orElseThrow(() -> new ShoppingCartException("Sepet öğesi bulunamadı!", HttpStatus.NOT_FOUND));

        if (quantity <= 0) {
            shoppingCartRepository.delete(cartItem);
            return null;
        }

        cartItem.setQuantity(quantity);
        return convertToResponse(shoppingCartRepository.save(cartItem));
    }

    @Override
    public void removeFromCart(Long cartId) {
        if (!shoppingCartRepository.existsById(cartId)) {
            throw new ShoppingCartException("Silinecek öğe bulunamadı!", HttpStatus.NOT_FOUND);
        }
        shoppingCartRepository.deleteById(cartId);
    }

    @Override
    @Transactional
    public void clearCart(Long userId) {
        List<ShoppingCart> items = shoppingCartRepository.findByUserId(userId);
        shoppingCartRepository.deleteAll(items);
    }

    private ShoppingCartResponse convertToResponse(ShoppingCart cart) {
        double price = cart.getProduct().getPrice();
        return new ShoppingCartResponse(
                cart.getId(),
                cart.getQuantity(),
                cart.getProduct().getId(),
                cart.getProduct().getName(),
                price,
                price * cart.getQuantity()
        );
    }
}