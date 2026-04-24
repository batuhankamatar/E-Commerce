package com.ecommerce.ecommerce_backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "products", schema = "ecommerce_schema")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotBlank(message = "Ürün ismi boş olamaz.")
    @Size(min = 3, max = 50, message = "Ürün ismi 3 ile 50 karakter arasında olmalıdır")
    @Column(name = "name")
    private String name;

    @NotBlank(message = "Ürün açıklaması boş olamaz.")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Ürün fiyatı boş olamaz.")
    @Min(value = 0, message = "Fiyat 0'dan az olamaz")
    @Column(name = "price")
    private Double price;

    @Column(name = "rating")
    private Double rating = 0.0;

    @NotNull(message = "Ürün adeti boş olamaz.")
    @Min(value = 0, message = "Stok 0'dan az olamaz")
    @Column(name = "stock")
    private Integer stock;

    @Column(name = "sell_count")
    private int sellCount = 0;

    @Column(name = "img")
    private String img;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImage> images;

    @OneToMany(mappedBy = "product")
    private List<ShoppingCart> carts;

    @ManyToMany(mappedBy = "favoriteProducts")
    private Set<User> favoritedByUsers = new HashSet<>();

}