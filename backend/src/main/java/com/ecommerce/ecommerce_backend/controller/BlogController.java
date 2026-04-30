package com.ecommerce.ecommerce_backend.controller;

import com.ecommerce.ecommerce_backend.dto.BlogRequest;
import com.ecommerce.ecommerce_backend.dto.BlogResponse;
import com.ecommerce.ecommerce_backend.service.BlogService;
import com.ecommerce.ecommerce_backend.service.FileStorageService;
import com.ecommerce.ecommerce_backend.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController @RequestMapping("/blogs") @AllArgsConstructor
public class BlogController {

    private final BlogService blogService;
    private final ImageService imageService;
    private final FileStorageService fileStorageService;

    @GetMapping
    public List<BlogResponse> findAll() {
        return blogService.findAllSortedByDate();
    }

    @GetMapping("/{id}")
    public BlogResponse findById(@PathVariable Long id) { return blogService.findById(id); }

    @GetMapping("/featured")
    public List<BlogResponse> getFeatured() { return blogService.findLatest3(); }

    @PostMapping
    public BlogResponse save(@RequestBody BlogRequest request) { return blogService.save(request); }

    @PutMapping("/{id}")
    public BlogResponse update(@PathVariable Long id, @RequestBody BlogRequest request) {
        return blogService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { blogService.delete(id); }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<String> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            byte[] processed = imageService.processImage(file);
            String fileName = "blog_" + id + ".png";
            fileStorageService.saveFile(processed, fileName);
            blogService.updateImage(id, fileName);
            return ResponseEntity.ok("Görsel yüklendi: " + fileName);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Hata: " + e.getMessage());
        }
    }
}
