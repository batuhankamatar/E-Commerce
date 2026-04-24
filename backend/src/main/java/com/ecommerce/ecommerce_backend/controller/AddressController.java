package com.ecommerce.ecommerce_backend.controller;

import com.ecommerce.ecommerce_backend.dto.AddressRequest;
import com.ecommerce.ecommerce_backend.dto.AddressResponse;
import com.ecommerce.ecommerce_backend.entity.Address;
import com.ecommerce.ecommerce_backend.service.AddressService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/address")
public class AddressController {

    private final AddressService addressService;

    @GetMapping("/user/{userId}")
    public List<AddressResponse> findAllByUserId(@PathVariable Long userId) {
        return addressService.findAllByUserId(userId);
    }

    @GetMapping("/{id}")
    public AddressResponse findById(@PathVariable Long id) {
        return addressService.findById(id);
    }

    @PostMapping("/{userId}")
    public AddressResponse save(@PathVariable Long userId, @RequestBody AddressRequest request) {
        Address address = new Address();
        mapRequestToEntity(request, address);

        return addressService.save(userId, address);
    }

    @PutMapping("/{id}")
    public AddressResponse update(@PathVariable Long id, @RequestBody AddressRequest request) {
        Address address = new Address();
        mapRequestToEntity(request, address);

        return addressService.update(id, address);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        addressService.delete(id);
    }

    private void mapRequestToEntity(AddressRequest request, Address address) {
        address.setTitle(request.getTitle());
        address.setName(request.getName());
        address.setSurname(request.getSurname());
        address.setPhone(request.getPhone());
        address.setCity(request.getCity());
        address.setDistrict(request.getDistrict());
        address.setNeighborhood(request.getNeighborhood());
        address.setAddress(request.getAddress());
    }
}