package com.klevis.backend.repository;

import com.klevis.backend.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findByCategory(String category);
    List<Product> findByIsTrendingTrue();
    List<Product> findByIsNewArrivalTrue();
}
