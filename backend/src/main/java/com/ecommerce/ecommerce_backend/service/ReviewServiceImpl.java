package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.ReviewRequest;
import com.ecommerce.ecommerce_backend.dto.ReviewResponse;
import com.ecommerce.ecommerce_backend.entity.Product;
import com.ecommerce.ecommerce_backend.entity.Review;
import com.ecommerce.ecommerce_backend.repository.ProductRepository;
import com.ecommerce.ecommerce_backend.repository.ReviewRepository;
import com.ecommerce.ecommerce_backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Override
    public List<ReviewResponse> findByProductId(Long productId) {
        return reviewRepository.findByProductId(productId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public ReviewResponse save(Long productId, Long userId, ReviewRequest request) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Ürün bulunamadı"));

        Review review = new Review();
        review.setProduct(product);
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        if (userId != null) {
            userRepository.findById(userId).ifPresent(review::setUser);
        }

        ReviewResponse saved = toResponse(reviewRepository.save(review));

        // Ortalama rating'i güncelle
        Double avg = reviewRepository.findAverageRatingByProductId(productId);
        product.setRating(avg != null ? avg : 0.0);
        productRepository.save(product);

        return saved;
    }

    private ReviewResponse toResponse(Review review) {
        ReviewResponse r = new ReviewResponse();
        r.setId(review.getId());
        r.setRating(review.getRating());
        r.setComment(review.getComment());
        r.setDate(review.getDate());
        r.setUserName(review.getUser() != null ? review.getUser().getName() : "Anonymous");
        return r;
    }
}