package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.UserResponse;
import com.ecommerce.ecommerce_backend.entity.Role;
import com.ecommerce.ecommerce_backend.entity.User;
import com.ecommerce.ecommerce_backend.exception.UserException;
import com.ecommerce.ecommerce_backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<UserResponse> findAll() {
        return userRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse findById(Long id) {
        User user = findEntityById(id);
        return convertToResponse(user);
    }

    @Override
    public User findEntityById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserException("Kullanıcı bulunamadı! ID: " + id, HttpStatus.NOT_FOUND));
    }

    @Override
    public UserResponse update(Long id, User userDetails) {
        User existingUser = findEntityById(id);

        existingUser.setName(userDetails.getName());
        existingUser.setSurname(userDetails.getSurname());
        existingUser.setGender(userDetails.getGender());
        existingUser.setBirthDate(userDetails.getBirthDate());

        User updatedUser = userRepository.save(existingUser);
        return convertToResponse(updatedUser);
    }

    @Override
    public void delete(Long id) {
        User user = findEntityById(id);
        userRepository.delete(user);
    }

    private UserResponse convertToResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setSurname(user.getSurname());
        response.setEmail(user.getEmail());
        response.setGender(user.getGender());
        response.setBirthDate(user.getBirthDate());

        response.setRoles(user.getRoles().stream()
                .map(Role::getAuthority)
                .collect(Collectors.toList()));

        if (user.getStore() != null) {
            response.setStoreName(user.getStore().getStoreName());
        }

        return response;
    }
}