package com.ecommerce.ecommerce_backend.controller;

import com.ecommerce.ecommerce_backend.dto.BestsellerProductResponse;
import com.ecommerce.ecommerce_backend.dto.ProductRequest;
import com.ecommerce.ecommerce_backend.dto.ProductResponse;
import com.ecommerce.ecommerce_backend.dto.ShopResponse;
import com.ecommerce.ecommerce_backend.entity.Product;
import com.ecommerce.ecommerce_backend.service.FileStorageService;
import com.ecommerce.ecommerce_backend.service.ImageService;
import com.ecommerce.ecommerce_backend.service.ProductService;
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

    @GetMapping("/category/{categoryId}")
    public List<ProductResponse> findByCategoryId(@PathVariable Long categoryId) {
        return productService.findAll().stream()
                .filter(p -> p.getCategoryId().equals(categoryId))
                .toList();
    }

    @GetMapping("/daily-deals")
    public List<ProductResponse> getDailyDeals() {
        return productService.findAll().stream()
                .filter(p -> p.getDiscountPrice() != null && p.getDiscountPrice() < p.getPrice())
                .sorted((p1, p2) -> Double.compare(
                        (p2.getPrice() - p2.getDiscountPrice()),
                        (p1.getPrice() - p1.getDiscountPrice())))
                .limit(10)
                .toList();
    }

    @PostMapping("/{categoryId}/{storeId}")
    public ProductResponse save(@PathVariable Long categoryId,
                                @PathVariable Long storeId,
                                @RequestBody Product product) {
        return productService.save(product, categoryId, storeId);
    }

    @PutMapping("/{id}/{storeId}")
    public ProductResponse update(@PathVariable Long id,
                                  @PathVariable Long storeId,
                                  @RequestBody ProductRequest request) {
        return productService.update(id, request, storeId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productService.delete(id);
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<String> handleImageUpload(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            byte[] processedImage = imageService.processImage(file);
            String fileName = "product_" + id + ".png";
            fileStorageService.saveFile(processedImage, fileName);
            productService.updateProductImage(id, fileName);
            return ResponseEntity.ok("Görsel başarıyla formatlandı ve yüklendi: " + fileName);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Hata: " + e.getMessage());
        }
    }

    @GetMapping("/category/{categoryId}/bestsellers")
    public List<BestsellerProductResponse> getBestsellers(@PathVariable Long categoryId) {
        return productService.findTop6ByCategoryId(categoryId);
    }

    @GetMapping("/most-popular")
    public ProductResponse getMostPopular() {
        return productService.findMostPopular();
    }

    @GetMapping("/shop")
    public ShopResponse getShopProducts(
            @RequestParam(required = false) String categoryCode,
            @RequestParam(defaultValue = "popularity") String sort,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        return productService.findShopProducts(categoryCode, sort, minPrice, maxPrice, page, size);
    }
}