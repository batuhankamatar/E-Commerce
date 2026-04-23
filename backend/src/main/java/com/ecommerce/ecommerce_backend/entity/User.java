package com.ecommerce.ecommerce_backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table (name = "users", schema = "ecommerce_schema")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotBlank(message = "İsim boş olamaz.")
    @Size(min = 3, max = 50, message = "İsim 3 ile 50 karakter arasında olmalıdır")
    @Column(name = "name")
    private String name;

    @NotBlank(message = "Soyisim boş olamaz.")
    @Size(min = 3, max = 50, message = "Soyisim 3 ile 50 karakter arasında olmalıdır")
    @Column(name = "surname")
    private String surname;

    @NotBlank(message = "E-mail alanı boş bırakılamaz.")
    @Email
    @Size(min = 10, max = 100, message = "E-mail 10 ile 60 karakter arasında olmalıdır")
    @Column(name = "email")
    private String email;

    @NotBlank(message = "Şifre boş bırakılamaz.")
    @Size(min = 8, message = "Şifre en az 8 karakter olmalıdır")
    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            schema = "ecommerce_schema",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private List<Role> roles;
}
