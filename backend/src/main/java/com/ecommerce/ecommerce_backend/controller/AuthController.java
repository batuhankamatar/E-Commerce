package com.ecommerce.ecommerce_backend.controller;

import com.ecommerce.ecommerce_backend.dto.LoginRequest;
import com.ecommerce.ecommerce_backend.dto.RegisterRequest;
import com.ecommerce.ecommerce_backend.dto.UserResponse;
import com.ecommerce.ecommerce_backend.entity.User;
import com.ecommerce.ecommerce_backend.security.TokenService;
import com.ecommerce.ecommerce_backend.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import com.ecommerce.ecommerce_backend.exception.UserException;

import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final TokenService tokenService;
    private final AuthenticationManager authManager;
    private final UserDetailsService userDetailsService;

    @PostMapping("/login")
    public UserResponse login(@RequestBody LoginRequest loginRequest) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        User user = (User) auth.getPrincipal();
        String token = tokenService.generateJwt(auth);

        UserResponse response = convertToResponse(user);
        response.setToken(token);
        return response;
    }

    @GetMapping("/verify")
    public UserResponse verify(Authentication authentication) {
        if (authentication == null) {
            throw new UserException("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        String email = authentication.getName();
        User user = (User) userDetailsService.loadUserByUsername(email);

        UserResponse response = convertToResponse(user);
        response.setToken(tokenService.generateJwt(authentication));
        return response;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@RequestBody RegisterRequest registerRequest) {
        User user = authService.register(registerRequest);
        String token = tokenService.generateToken(user);
        UserResponse response = convertToResponse(user);
        response.setToken(token);
        return response;
    }

    private UserResponse convertToResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setSurname(user.getSurname());
        response.setEmail(user.getEmail());
        response.setGender(user.getGender());
        response.setBirthDate(user.getBirthDate());
        if (user.getRoles() != null) {
            response.setRoles(user.getRoles().stream()
                    .map(role -> role.getAuthority())
                    .collect(Collectors.toList()));
        }
        if (user.getStore() != null) {
            response.setStoreName(user.getStore().getStoreName());
        }
        return response;
    }
}