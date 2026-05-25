package com.klevis.backend.controller;

import com.klevis.backend.model.Product;
import com.klevis.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product productDetails) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(productDetails.getName());
                    product.setCategory(productDetails.getCategory());
                    product.setPrice(productDetails.getPrice());
                    product.setOriginalPrice(productDetails.getOriginalPrice());
                    product.setDiscount(productDetails.getDiscount());
                    product.setRating(productDetails.getRating());
                    product.setReviews(productDetails.getReviews());
                    product.setImage(productDetails.getImage());
                    product.setImages(productDetails.getImages());
                    product.setSizes(productDetails.getSizes());
                    product.setColors(productDetails.getColors());
                    product.setBrand(productDetails.getBrand());
                    product.setDescription(productDetails.getDescription());
                    product.setNewArrival(productDetails.isNewArrival());
                    product.setTrending(productDetails.isTrending());
                    product.setBestSeller(productDetails.isBestSeller());
                    return ResponseEntity.ok(productRepository.save(product));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
