package com.ecommerce.ecommerce_backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "address", schema = "ecommerce_schema")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotBlank(message = "Adres başlığı boş olamaz.")
    @Column(name = "title")
    private String title;

    @NotBlank(message = "İsim boş olamaz.")
    @Column(name = "name")
    private String name;

    @NotBlank(message = "Soyisim boş olamaz.")
    @Column(name = "surname")
    private String surname;

    @NotBlank(message = "Telefon numarası boş olamaz.")
    @Column(name = "phone")
    private String phone;

    @NotBlank(message = "Şehir boş olamaz.")
    @Column(name = "city")
    private String city;

    @NotBlank(message = "İlçe boş olamaz.")
    @Column(name = "district")
    private String district;

    @NotBlank(message = "Mahalle boş olamaz.")
    @Column(name = "neighborhood")
    private String neighborhood;

    @NotBlank(message = "Adres boş olamaz.")
    @Column(name = "address")
    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "address")
    private List<Order> orders;
}
