package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.RegisterRequest;
import com.ecommerce.ecommerce_backend.entity.Gender;
import com.ecommerce.ecommerce_backend.entity.Role;
import com.ecommerce.ecommerce_backend.entity.Store;
import com.ecommerce.ecommerce_backend.entity.User;
import com.ecommerce.ecommerce_backend.exception.UserException;
import com.ecommerce.ecommerce_backend.repository.RoleRepository; // Eklendi
import com.ecommerce.ecommerce_backend.repository.StoreRepository;
import com.ecommerce.ecommerce_backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class AuthServiceImpl implements AuthService, org.springframework.security.core.userdetails.UserDetailsService {

    private final UserRepository userRepository;
    private final StoreRepository storeRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public User register(RegisterRequest request) {
        Optional<User> foundUser = userRepository.findByEmail(request.getEmail());
        if (foundUser.isPresent()) {
            throw new UserException("Bu e-posta adresi zaten kullanımda!", HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setName(request.getName());
        user.setSurname(request.getSurname());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setGender(Gender.valueOf(request.getGender().toUpperCase()));
        user.setBirthDate(LocalDate.parse(request.getBirthDate()));

        List<Role> roles = new ArrayList<>();
        if (request.getRoleId() != null) {
            Role selectedRole = roleRepository.findById(request.getRoleId())
                    .orElseThrow(() -> new UserException("Seçilen rol bulunamadı!", HttpStatus.NOT_FOUND));
            roles.add(selectedRole);
        } else {
            Role customerRole = roleRepository.findByAuthority("ROLE_CUSTOMER")
                    .orElseThrow(() -> new UserException("Başlangıç rolü bulunamadı!", HttpStatus.INTERNAL_SERVER_ERROR));
            roles.add(customerRole);
        }
        user.setRoles(roles);

        User savedUser = userRepository.save(user);

        if (request.getStore() != null) {
            Store store = new Store();
            store.setStoreName(request.getStore().getStoreName());
            store.setTaxNo(request.getStore().getTaxNo());
            store.setBankAccount(request.getStore().getBankAccount());
            store.setUser(savedUser);

            storeRepository.save(store);
            savedUser.setStore(store);
        }

        return savedUser;
    }

    @Override
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserException("Kullanıcı bulunamadı!", HttpStatus.NOT_FOUND));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new UserException("Hatalı şifre!", HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    @Override
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String email)
            throws org.springframework.security.core.userdetails.UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new org.springframework.security.core.userdetails.UsernameNotFoundException("User not found with email: " + email));
    }
}