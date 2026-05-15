package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.*;
import com.ecommerce.ecommerce_backend.entity.*;
import com.ecommerce.ecommerce_backend.exception.ProductException;
import com.ecommerce.ecommerce_backend.repository.ProductImageRepository;
import com.ecommerce.ecommerce_backend.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final StoreService storeService;
    private final ProductImageRepository productImageRepository;

    @Override
    public List<ProductResponse> findAll() {
        return productRepository.findAll().stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    @Override
    public ProductResponse findById(Long id) {
        return convertToResponse(findEntityById(id));
    }

    @Override
    public Product findEntityById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new ProductException("Ürün bulunamadı!", HttpStatus.NOT_FOUND));
    }

    @Override
    public ProductResponse save(Product product, Long categoryId, Long storeId) {
        product.setCategory(categoryService.findEntityById(categoryId));
        product.setStore(storeService.findEntityById(storeId));
        return convertToResponse(productRepository.save(product));
    }

    @Override
    public ProductResponse update(Long id, ProductRequest request, Long storeId) {
        Product p = findEntityById(id);
        p.setName(request.getName());
        return convertToResponse(productRepository.save(p));
    }

    @Override
    public void delete(Long id) {
        productRepository.delete(findEntityById(id));
    }

    @Override
    public void updateProductImage(Long id, String fileName) {
        Product p = findEntityById(id);
        ProductImage pi = new ProductImage();
        pi.setImg(fileName);
        pi.setProduct(p);
        productImageRepository.save(pi);
    }

    @Override
    public List<BestsellerProductResponse> findTop6ByCategoryId(Long categoryId) {
        return productRepository.findTop6ByCategoryOrderBySellCount(categoryId).stream()
                .map(this::convertToBestsellerResponse).collect(Collectors.toList());
    }

    @Override
    public List<ProductResponse> getDailyDeals() {
        return productRepository.findDailyDeals().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponse findMostPopular() {
        Product p = productRepository.findMostPopular();
        if(p == null) throw new ProductException("Popüler ürün yok!", HttpStatus.NOT_FOUND);
        return convertToResponse(p);
    }

    @Override
    public ShopResponse findShopProducts(String category, String filter, String sort, int offset, int limit) {
        String finalCategory = (category != null && !category.isEmpty()) ? category : null;
        String finalFilter = (filter != null && !filter.isEmpty()) ? filter : null;
        String finalSort = (sort != null && !sort.isEmpty()) ? sort : null;

        List<ProductResponse> products = productRepository
                .findShopProductsV2(finalCategory, finalFilter, finalSort, limit, offset)
                .stream().map(this::convertToResponse).collect(Collectors.toList());

        long totalCount = productRepository.countShopProductsV2(finalCategory, finalFilter);
        int totalPages = (int) Math.ceil((double) totalCount / limit);
        int currentPage = offset / limit;

        return new ShopResponse(products, totalCount, totalPages, currentPage);
    }

    private ProductResponse convertToResponse(Product product) {
        ProductResponse res = new ProductResponse();
        res.setId(product.getId());
        res.setName(product.getName());
        res.setDescription(product.getDescription());
        res.setPrice(product.getPrice());
        res.setDiscountPrice(product.getDiscountPrice());
        res.setRating(product.getRating());
        res.setSellCount(product.getSellCount());
        res.setStock(product.getStock());

        if (product.getCategory() != null) {
            res.setCategoryId(product.getCategory().getId());
            res.setCategoryName(product.getCategory().getTitle());
        }
        if (product.getImages() != null && !product.getImages().isEmpty()) {
            res.setMainImage(product.getImages().get(0).getImg());
            res.setImageUrls(product.getImages().stream().map(ProductImage::getImg).collect(Collectors.toList()));
        }
        return res;
    }

    private BestsellerProductResponse convertToBestsellerResponse(Product product) {
        BestsellerProductResponse b = new BestsellerProductResponse();
        b.setId(product.getId());
        b.setName(product.getName());
        b.setPrice(product.getPrice());
        b.setDiscountPrice(product.getDiscountPrice());
        if (product.getImages() != null && !product.getImages().isEmpty()) {
            b.setMainImage(product.getImages().get(0).getImg());
        }
        return b;
    }
}