package com.ecommerce.ecommerce_backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "categories", schema = "ecommerce_schema")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotBlank(message = "Kategori kodu boş olamaz.")
    @Size(min = 2, max = 20, message = "Kategori kodu 2 ile 20 karakter arasında olmalıdır.")
    @Column(name = "code", unique = true, nullable = false)
    private String code;

    @PrePersist
    @PreUpdate
    public void ensureUpperCase() {
        if (this.code != null) {
            this.code = this.code.toUpperCase();
        }
    }

    @NotNull
    @Column(name = "title")
    private String title;

    @Column(name = "img")
    private String img;

    @Column(name = "rating")
    private double rating;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Product> products;
}
