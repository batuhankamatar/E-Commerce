package com.ecommerce.ecommerce_backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "cards", schema = "ecommerce_schema")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotBlank(message = "Kart numarası boş olamaz.")
    @Column(name = "card_no")
    private String cardNo;

    @NotNull(message = "Son kullanma ayı boş olamaz.")
    @Min(value = 1, message = "Ay en az 1 olabilir.")
    @Max(value = 12, message = "Ay en fazla 12 olabilir.")
    @Column(name = "expire_month")
    private Integer expireMonth;

    @NotNull(message = "Son kullanma yılı boş olamaz.")
    @Column(name = "expire_year")
    private Integer expireYear;

    @NotBlank(message = "Kart üzerindeki isim boş olamaz.")
    @Column(name = "name_on_card")
    private String nameOnCard;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}