package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.RegisterRequest;
import com.ecommerce.ecommerce_backend.entity.Role;
import com.ecommerce.ecommerce_backend.entity.Store;
import com.ecommerce.ecommerce_backend.entity.User;
import com.ecommerce.ecommerce_backend.exception.UserException;
import com.ecommerce.ecommerce_backend.repository.StoreRepository;
import com.ecommerce.ecommerce_backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final StoreRepository storeRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService;

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
        user.setGender(request.getGender());
        user.setBirthDate(request.getBirthDate());

        List<Role> roles = new ArrayList<>();
        Role customerRole = roleService.findEntityByAuthority("ROLE_CUSTOMER");
        roles.add(customerRole);

        if ("STORE".equalsIgnoreCase(request.getType())) {
            Role storeRole = roleService.findEntityByAuthority("ROLE_STORE");
            roles.add(storeRole);
        }
        user.setRoles(roles);

        User savedUser = userRepository.save(user);

        if ("STORE".equalsIgnoreCase(request.getType())) {
            Store store = new Store();
            store.setStoreName(request.getStoreName());
            store.setTaxNo(request.getTaxNo());
            store.setBankAccount(request.getBankAccount());
            store.setUser(savedUser);
            savedUser.setStore(store);

            storeRepository.save(store);
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
}