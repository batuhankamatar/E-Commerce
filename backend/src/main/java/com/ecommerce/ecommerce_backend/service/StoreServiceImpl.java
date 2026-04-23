package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.StoreResponse;
import com.ecommerce.ecommerce_backend.entity.Store;
import com.ecommerce.ecommerce_backend.exception.StoreException;
import com.ecommerce.ecommerce_backend.repository.StoreRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreRepository storeRepository;

    @Override
    public List<StoreResponse> findAll() {
        return storeRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public StoreResponse findById(Long id) {
        Store store = findEntityById(id);
        return convertToResponse(store);
    }

    @Override
    public Store findEntityById(Long id) {
        return storeRepository.findById(id)
                .orElseThrow(() -> new StoreException("Mağaza bulunamadı! ID: " + id, HttpStatus.NOT_FOUND));
    }

    @Override
    public StoreResponse update(Long id, Store storeDetails) {
        Store existingStore = findEntityById(id);

        existingStore.setStoreName(storeDetails.getStoreName());
        existingStore.setTaxNo(storeDetails.getTaxNo());
        existingStore.setBankAccount(storeDetails.getBankAccount());

        Store updatedStore = storeRepository.save(existingStore);
        return convertToResponse(updatedStore);
    }

    @Override
    public void delete(Long id) {
        Store store = findEntityById(id);
        storeRepository.delete(store);
    }

    private StoreResponse convertToResponse(Store store) {
        return new StoreResponse(
                store.getId(),
                store.getStoreName(),
                store.getTaxNo(),
                store.getBankAccount(),
                store.getUser().getId(),
                store.getUser().getName() + " " + store.getUser().getSurname()
        );
    }
}