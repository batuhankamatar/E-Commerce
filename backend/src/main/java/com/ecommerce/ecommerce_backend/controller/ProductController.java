package com.ecommerce.ecommerce_backend.controller;

import com.ecommerce.ecommerce_backend.dto.*;
import com.ecommerce.ecommerce_backend.entity.Product;
import com.ecommerce.ecommerce_backend.service.*;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;
    private final ImageService imageService;
    private final FileStorageService fileStorageService;

    @GetMapping
    public List<ProductResponse> findAll() {
        return productService.findAll();
    }

    @GetMapping("/{id}")
    public ProductResponse findById(@PathVariable Long id) {
        return productService.findById(id);
    }

    @GetMapping("/shop")
    public ShopResponse getShopProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) String filter,
            @RequestParam(defaultValue = "0") int offset,
            @RequestParam(defaultValue = "25") int limit
    ) {
        return productService.findShopProducts(category, filter, sort, offset, limit);
    }

    @GetMapping("/most-popular")
    public ProductResponse getMostPopular() {
        return productService.findById(productService.findMostPopular().getId());
    }

    @GetMapping("/category/{categoryId}/bestsellers")
    public List<BestsellerProductResponse> getBestsellers(@PathVariable Long categoryId) {
        return productService.findTop6ByCategoryId(categoryId);
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<String> handleImageUpload(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            byte[] processedImage = imageService.processImage(file);
            String fileName = "product_" + id + ".png";
            fileStorageService.saveFile(processedImage, fileName);
            productService.updateProductImage(id, fileName);
            return ResponseEntity.ok("Görsel yüklendi: " + fileName);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Hata: " + e.getMessage());
        }
    }

    @GetMapping("/daily-deals")
    public List<ProductResponse> getDailyDeals() {
        return productService.getDailyDeals();
    }
}