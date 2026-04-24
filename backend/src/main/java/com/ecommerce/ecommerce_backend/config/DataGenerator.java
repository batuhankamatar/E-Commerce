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
            clothing.setTitle("Clothing");
            clothing.setGender(Gender.FEMALE);
            categoryRepository.save(clothing);

            Category grocery = new Category();
            grocery.setCode("GROCERY");
            grocery.setTitle("Grocery");
            categoryRepository.save(grocery);

            Category tech = new Category();
            tech.setCode("TECH");
            tech.setTitle("Technology");
            categoryRepository.save(tech);

            Category furniture = new Category();
            furniture.setCode("FURNITURE");
            furniture.setTitle("Furniture");
            categoryRepository.save(furniture);

            Category decoration = new Category();
            decoration.setCode("DECORATION");
            decoration.setTitle("Decoration");
            categoryRepository.save(decoration);

            Category homeOffice = new Category();
            homeOffice.setCode("HOME_OFFICE");
            homeOffice.setTitle("Home & Office");
            categoryRepository.save(homeOffice);

            System.out.println("Başlangıç kategorileri başarıyla yüklendi!");
        }
    }
}