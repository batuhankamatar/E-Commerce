package com.ecommerce.ecommerce_backend.config;

import com.ecommerce.ecommerce_backend.entity.Category;
import com.ecommerce.ecommerce_backend.entity.Gender;
import com.ecommerce.ecommerce_backend.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
@AllArgsConstructor
public class DataGenerator implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() == 0) {

            Category clothing = new Category();
            clothing.setCode("CLOTHING");
            clothing.setTitle("Giyim");
            clothing.setGender(Gender.FEMALE);
            clothing.setRating(4.5);
            categoryRepository.save(clothing);

            Category grocery = new Category();
            grocery.setCode("GROCERY");
            grocery.setTitle("Market");
            grocery.setRating(4.8);
            categoryRepository.save(grocery);

            Category tech = new Category();
            tech.setCode("TECH");
            tech.setTitle("Teknoloji");
            tech.setRating(4.9);
            categoryRepository.save(tech);

            System.out.println("Başlangıç kategorileri başarıyla yüklendi!");
        }
    }
}