package com.klevis.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "products")
public class Product {
    @Id
    private String id;
    private String name;
    private String category;
    private double price;
    private double originalPrice;
    private int discount;
    private double rating;
    private int reviews;
    private String image;
    private List<String> images;
    private List<String> sizes;
    private List<String> colors;
    private String brand;
    private String description;
    private boolean isNewArrival;
    private boolean isTrending;
    private boolean isBestSeller;
}
