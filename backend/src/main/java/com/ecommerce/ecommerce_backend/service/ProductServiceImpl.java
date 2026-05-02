package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.dto.BestsellerProductResponse;
import com.ecommerce.ecommerce_backend.dto.ProductResponse;
import com.ecommerce.ecommerce_backend.dto.ShopResponse;
import com.ecommerce.ecommerce_backend.entity.Category;
import com.ecommerce.ecommerce_backend.entity.Product;
import com.ecommerce.ecommerce_backend.entity.ProductImage;
import com.ecommerce.ecommerce_backend.entity.Store;
import com.ecommerce.ecommerce_backend.exception.ProductException;
import com.ecommerce.ecommerce_backend.repository.ProductImageRepository;
import com.ecommerce.ecommerce_backend.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.ecommerce.ecommerce_backend.dto.ProductRequest;

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
        return productRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponse findById(Long id) {
        return convertToResponse(findEntityById(id));
    }

    @Override
    public Product findEntityById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductException("Ürün bulunamadı! ID: " + id, HttpStatus.NOT_FOUND));
    }

    @Override
    public ProductResponse save(Product product, Long categoryId, Long storeId) {
        Category category = categoryService.findEntityById(categoryId);
        Store store = storeService.findEntityById(storeId);

        product.setCategory(category);
        product.setStore(store);

        return convertToResponse(productRepository.save(product));
    }

    @Override
    public ProductResponse update(Long id, ProductRequest request, Long storeId) {
        Product existingProduct = findEntityById(id);

        if (!existingProduct.getStore().getId().equals(storeId)) {
            throw new ProductException("Bu ürünü güncelleme yetkiniz yok!", HttpStatus.FORBIDDEN);
        }

        existingProduct.setName(request.getName());
        existingProduct.setDescription(request.getDescription());
        existingProduct.setPrice(request.getPrice());
        existingProduct.setDiscountPrice(request.getDiscountPrice());
        existingProduct.setStock(request.getStock());
        existingProduct.setImg(request.getMainImage());

        if (request.getCategoryId() != null) {
            Category newCategory = categoryService.findEntityById(request.getCategoryId());
            existingProduct.setCategory(newCategory);
        }

        return convertToResponse(productRepository.save(existingProduct));
    }

    @Override
    public void delete(Long id) {
        Product product = findEntityById(id);
        productRepository.delete(product);
    }

    private ProductResponse convertToResponse(Product product) {
        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setDiscountPrice(product.getDiscountPrice());
        response.setStock(product.getStock());
        response.setSellCount(product.getSellCount());
        response.setRating(product.getRating());

        response.setReviewCount(product.getReviews() != null ? product.getReviews().size() : 0);

        if (product.getImages() != null && !product.getImages().isEmpty()) {
            String mainImg = product.getImages().stream()
                    .filter(img -> img.getDisplayOrder() == 1)
                    .map(ProductImage::getImg)
                    .findFirst()
                    .orElse(product.getImages().get(0).getImg());

            response.setMainImage(mainImg);

            response.setImageUrls(product.getImages().stream()
                    .map(ProductImage::getImg)
                    .collect(Collectors.toList()));
        }

        if (product.getCategory() != null) {
            response.setCategoryId(product.getCategory().getId());
            response.setCategoryName(product.getCategory().getTitle());
        }

        if (product.getStore() != null) {
            response.setStoreId(product.getStore().getId());
            response.setStoreName(product.getStore().getStoreName());
        }

        return response;
    }

    @Override
    public void updateProductImage(Long id, String fileName) {
        Product product = findEntityById(id);

        if (product.getImages() != null) {
            product.getImages().forEach(img -> img.setDisplayOrder(img.getDisplayOrder() + 1));
            productImageRepository.saveAll(product.getImages());
        }

        ProductImage newImage = new ProductImage();
        newImage.setImg(fileName);
        newImage.setProduct(product);
        newImage.setDisplayOrder(1);
        productImageRepository.save(newImage);
    }

    @Override
    public List<BestsellerProductResponse> findTop6ByCategoryId(Long categoryId) {
        return productRepository.findTop6ByCategoryOrderBySellCount(categoryId)
                .stream()
                .map(this::convertToBestsellerResponse)
                .collect(Collectors.toList());
    }

    private BestsellerProductResponse convertToBestsellerResponse(Product product) {
        BestsellerProductResponse response = new BestsellerProductResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setPrice(product.getPrice());
        response.setDiscountPrice(product.getDiscountPrice());
        response.setGender(product.getGender());

        if (product.getImages() != null && !product.getImages().isEmpty()) {
            String mainImg = product.getImages().stream()
                    .filter(img -> img.getDisplayOrder() == 1)
                    .map(ProductImage::getImg)
                    .findFirst()
                    .orElse(product.getImages().get(0).getImg());

            response.setMainImage(mainImg);
        }
        return response;
    }

    @Override
    public ProductResponse findMostPopular() {
        Product product = productRepository.findMostPopular();
        if (product == null) {
            throw new ProductException("En popüler ürün bulunamadı!", HttpStatus.NOT_FOUND);
        }
        return convertToResponse(product);
    }

    @Override
    public ShopResponse findShopProducts(String categoryCode, String sort, Double minPrice, Double maxPrice, int page, int size) {
        int offset = page * size;
        List<ProductResponse> products = productRepository
                .findShopProducts(categoryCode, sort, minPrice, maxPrice, size, offset)
                .stream().map(this::convertToResponse).collect(Collectors.toList());
        long totalCount = productRepository.countShopProducts(categoryCode, minPrice, maxPrice);
        int totalPages = (int) Math.ceil((double) totalCount / size);
        return new ShopResponse(products, totalCount, totalPages, page);
    }
}