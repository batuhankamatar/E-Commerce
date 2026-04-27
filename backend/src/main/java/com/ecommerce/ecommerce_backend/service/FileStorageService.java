package com.ecommerce.ecommerce_backend.service;

import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileStorageService {

    private final String uploadDir = "E:/Projects/E-Commerce/frontend/src/assets/products/";

    public String saveFile(byte[] imageBytes, String fileName) throws Exception {
        Path path = Paths.get(uploadDir + fileName);
        Files.write(path, imageBytes);
        return fileName;
    }
}