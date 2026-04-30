package com.ecommerce.ecommerce_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "blogs", schema = "ecommerce_schema")
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "excerpt", columnDefinition = "TEXT")
    private String excerpt;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "image")
    private String image;

    @Column(name = "date")
    private LocalDate date = LocalDate.now();

    @Column(name = "comment_count")
    private Integer commentCount = 0;

    @Column(name = "is_new")
    private Boolean isNew = true;
}