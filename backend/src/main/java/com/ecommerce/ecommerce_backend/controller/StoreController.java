package com.ecommerce.ecommerce_backend.controller;

import com.ecommerce.ecommerce_backend.dto.StoreRequest;
import com.ecommerce.ecommerce_backend.dto.StoreResponse;
import com.ecommerce.ecommerce_backend.entity.Store;
import com.ecommerce.ecommerce_backend.service.StoreService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/stores")
public class StoreController {

    private final StoreService storeService;

    @GetMapping
    public List<StoreResponse> findAll() {
        return storeService.findAll();
    }

    @GetMapping("/{id}")
    public StoreResponse findById(@PathVariable Long id) {
        return storeService.findById(id);
    }

    @PostMapping("/{userId}")
    public StoreResponse createStore(@PathVariable Long userId, @RequestBody StoreRequest request) {
        Store store = new Store();
        store.setStoreName(request.getStoreName());
        store.setTaxNo(request.getTaxNo());
        store.setBankAccount(request.getBankAccount());
        return storeService.save(userId, store);
    }

    @PutMapping("/{id}")
    public StoreResponse update(@PathVariable Long id, @RequestBody StoreRequest request) {
        Store store = new Store();
        store.setStoreName(request.getStoreName());
        store.setTaxNo(request.getTaxNo());
        store.setBankAccount(request.getBankAccount());

        return storeService.update(id, store);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        storeService.delete(id);
    }
}