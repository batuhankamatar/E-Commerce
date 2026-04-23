package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.ProductResponse;
import com.ecommerce.ecommerce_backend.entity.Category;
import com.ecommerce.ecommerce_backend.entity.Product;
import com.ecommerce.ecommerce_backend.entity.ProductImage;
import com.ecommerce.ecommerce_backend.exception.ProductException;
import com.ecommerce.ecommerce_backend.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;

    @Override
    public List<ProductResponse> findAll() {
        return productRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponse findById(Long id) {
        return convertToResponse(findEntityById(id));
    }

    @Override
    public Product findEntityById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductException("Ürün bulunamadı! ID: " + id, HttpStatus.NOT_FOUND));
    }

    @Override
    public ProductResponse save(Product product, Long categoryId) {
        Category category = categoryService.findEntityById(categoryId);
        product.setCategory(category);
        return convertToResponse(productRepository.save(product));
    }

    @Override
    public ProductResponse update(Long id, Product productDetails) {
        Product existingProduct = findEntityById(id);

        existingProduct.setName(productDetails.getName());
        existingProduct.setDescription(productDetails.getDescription());
        existingProduct.setPrice(productDetails.getPrice());
        existingProduct.setStock(productDetails.getStock());

        return convertToResponse(productRepository.save(existingProduct));
    }

    @Override
    public void delete(Long id) {
        Product product = findEntityById(id);
        productRepository.delete(product);
    }

    private ProductResponse convertToResponse(Product product) {
        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setStock(product.getStock());
        response.setSellCount(product.getSellCount());
        response.setMainImage(product.getImg());

        if (product.getCategory() != null) {
            response.setCategoryId(product.getCategory().getId());
            response.setCategoryName(product.getCategory().getTitle());
        }

        if (product.getImages() != null) {
            response.setImageUrls(product.getImages().stream()
                    .map(ProductImage::getImg)
                    .collect(Collectors.toList()));
        }

        return response;
    }
}