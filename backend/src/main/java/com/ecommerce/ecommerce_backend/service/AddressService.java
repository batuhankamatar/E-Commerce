package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.AddressResponse;
import com.ecommerce.ecommerce_backend.entity.Address;
import java.util.List;

public interface AddressService {
    List<AddressResponse> findAllByUserId(Long userId);
    AddressResponse findById(Long id);
    Address findEntityById(Long id);
    AddressResponse save(Long userId, Address address);
    AddressResponse update(Long id, Address addressDetails);
    void delete(Long id);
}