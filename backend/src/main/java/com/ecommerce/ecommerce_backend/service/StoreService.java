package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.StoreResponse;
import com.ecommerce.ecommerce_backend.entity.Store;
import java.util.List;

public interface StoreService {
    List<StoreResponse> findAll();
    StoreResponse findById(Long id);
    Store findEntityById(Long id);
    StoreResponse update(Long id, Store storeDetails);
    void delete(Long id);
}