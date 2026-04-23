package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.ProductImageResponse;
import com.ecommerce.ecommerce_backend.entity.ProductImage;
import com.ecommerce.ecommerce_backend.exception.GlobalException;
import com.ecommerce.ecommerce_backend.repository.ProductImageRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductImageServiceImpl implements ProductImageService {

    private final ProductImageRepository productImageRepository;

    @Override
    public List<ProductImageResponse> findAllByProductId(Long productId) {
        return productImageRepository.findAll().stream()
                .filter(img -> img.getProduct().getId().equals(productId))
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProductImageResponse findById(Long id) {
        return convertToResponse(findEntityById(id));
    }

    @Override
    public ProductImage findEntityById(Long id) {
        return productImageRepository.findById(id)
                .orElseThrow(() -> new GlobalException("Görsel bulunamadı! ID: " + id, HttpStatus.NOT_FOUND));
    }

    @Override
    public ProductImageResponse save(Long productId, ProductImage productImage) {
        return convertToResponse(productImageRepository.save(productImage));
    }

    @Override
    public void delete(Long id) {
        ProductImage image = findEntityById(id);
        productImageRepository.delete(image);
    }

    private ProductImageResponse convertToResponse(ProductImage image) {
        return new ProductImageResponse(
                image.getId(),
                image.getImg(),
                image.getDisplayOrder(),
                image.getProduct().getId()
        );
    }
}