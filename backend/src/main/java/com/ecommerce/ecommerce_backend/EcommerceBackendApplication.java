package com.ecommerce.ecommerce_backend;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EcommerceBackendApplication {

	public static void main(String[] args) {
		System.out.println(">>> [DEBUG-STARTUP] Main Metodu Tetiklendi! Saniye Sayacı Başlıyor...");
		SpringApplication.run(EcommerceBackendApplication.class, args);
	}

	@PostConstruct
	public void init() {
		System.out.println(">>> [DEBUG-STARTUP] Spring Bagimliliklari ve Configler Tamamlandi!");
	}
}