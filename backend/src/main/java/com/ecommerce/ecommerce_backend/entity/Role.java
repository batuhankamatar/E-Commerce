package com.ecommerce.ecommerce_backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "roles", schema = "ecommerce_schema")
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotBlank(message = "Rol adı boş olamaz")
    @Size(max = 50, message = "Rol adı en fazla 50 karakter olabilir")
    @Column(name = "authority", unique = true)
    private String authority;

    @Override
    public String getAuthority() {
        return this.authority;
    }
}
