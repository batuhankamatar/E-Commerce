package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.AddressResponse;
import com.ecommerce.ecommerce_backend.entity.Address;
import com.ecommerce.ecommerce_backend.entity.User;
import com.ecommerce.ecommerce_backend.exception.GlobalException;
import com.ecommerce.ecommerce_backend.repository.AddressRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final UserService userService;

    @Override
    public List<AddressResponse> findAllByUserId(Long userId) {
        return addressRepository.findAll().stream()
                .filter(addr -> addr.getUser().getId().equals(userId))
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public AddressResponse findById(Long id) {
        return convertToResponse(findEntityById(id));
    }

    @Override
    public Address findEntityById(Long id) {
        return addressRepository.findById(id)
                .orElseThrow(() -> new GlobalException("Adres bulunamadı! ID: " + id, HttpStatus.NOT_FOUND));
    }

    @Override
    public AddressResponse save(Long userId, Address address) {
        User user = userService.findEntityById(userId);
        address.setUser(user);
        return convertToResponse(addressRepository.save(address));
    }

    @Override
    public AddressResponse update(Long id, Address addressDetails) {
        Address existingAddress = findEntityById(id);

        existingAddress.setTitle(addressDetails.getTitle());
        existingAddress.setName(addressDetails.getName());
        existingAddress.setSurname(addressDetails.getSurname());
        existingAddress.setPhone(addressDetails.getPhone());
        existingAddress.setCity(addressDetails.getCity());
        existingAddress.setDistrict(addressDetails.getDistrict());
        existingAddress.setNeighborhood(addressDetails.getNeighborhood());
        existingAddress.setAddress(addressDetails.getAddress());

        return convertToResponse(addressRepository.save(existingAddress));
    }

    @Override
    public void delete(Long id) {
        Address address = findEntityById(id);
        addressRepository.delete(address);
    }

    private AddressResponse convertToResponse(Address address) {
        return new AddressResponse(
                address.getId(),
                address.getTitle(),
                address.getName(),
                address.getSurname(),
                address.getPhone(),
                address.getCity(),
                address.getDistrict(),
                address.getNeighborhood(),
                address.getAddress()
        );
    }
}