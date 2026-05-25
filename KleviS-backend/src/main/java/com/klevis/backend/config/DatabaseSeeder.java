package com.klevis.backend.config;

import com.klevis.backend.model.Product;
import com.klevis.backend.model.User;
import com.klevis.backend.repository.ProductRepository;
import com.klevis.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed Admin User if not exists
        if (userRepository.findByEmail("admin@klevis.lk").isEmpty()) {
            User admin = new User();
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setEmail("admin@klevis.lk");
            admin.setPassword("admin123"); // Simple password for development
            admin.setRole("ROLE_ADMIN");
            userRepository.save(admin);
            System.out.println("Admin user seeded successfully!");
        }

        // 2. Seed Products if repository is empty
        if (productRepository.count() == 0) {
            Product p1 = new Product(
                null,
                "Classic White T-Shirt",
                "Men",
                29.99,
                39.99,
                25,
                4.8,
                124,
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
                Arrays.asList(
                    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800"
                ),
                Arrays.asList("S", "M", "L", "XL"),
                Arrays.asList("White", "Black", "Gray"),
                "KleviS.lk Basics",
                "A premium quality classic white t-shirt made from 100% organic cotton. Perfect for everyday wear.",
                false,
                true,
                true
            );

            Product p2 = new Product(
                null,
                "Elegant Black Dress",
                "Women",
                89.99,
                120.00,
                25,
                4.9,
                89,
                "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800",
                Arrays.asList(
                    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800"
                ),
                Arrays.asList("XS", "S", "M", "L"),
                Arrays.asList("Black", "Red"),
                "KleviS.lk Premium",
                "Stunning elegant black dress suitable for evening parties and special occasions. Features a flattering silhouette.",
                true,
                true,
                false
            );

            Product p3 = new Product(
                null,
                "Denim Jacket",
                "Men",
                79.99,
                79.99,
                0,
                4.7,
                210,
                "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800",
                List.of("https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800"),
                Arrays.asList("M", "L", "XL", "XXL"),
                Arrays.asList("Blue", "Light Blue"),
                "KleviS.lk Denim",
                "Classic blue denim jacket with a comfortable fit. A timeless wardrobe essential.",
                false,
                false,
                true
            );

            Product p4 = new Product(
                null,
                "Summer Floral Blouse",
                "Women",
                45.00,
                60.00,
                25,
                4.5,
                65,
                "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
                List.of("https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800"),
                Arrays.asList("S", "M", "L"),
                List.of("Multi"),
                "KleviS.lk Basics",
                "Lightweight summer blouse with beautiful floral print. Perfect for warm days.",
                true,
                false,
                false
            );

            Product p5 = new Product(
                null,
                "Kids Colorful Hoodie",
                "Kids",
                34.99,
                34.99,
                0,
                4.6,
                42,
                "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=800",
                List.of("https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=800"),
                Arrays.asList("4Y", "6Y", "8Y", "10Y"),
                Arrays.asList("Yellow", "Red", "Blue"),
                "KleviS.lk Kids",
                "Cozy and colorful hoodie for kids. Keeps them warm and stylish.",
                false,
                false,
                true
            );

            Product p6 = new Product(
                null,
                "Leather Crossbody Bag",
                "Accessories",
                129.99,
                159.99,
                19,
                4.9,
                156,
                "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800",
                List.of("https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800"),
                List.of("One Size"),
                Arrays.asList("Brown", "Black"),
                "KleviS.lk Premium",
                "Genuine leather crossbody bag with adjustable strap and multiple compartments.",
                false,
                true,
                true
            );

            Product p7 = new Product(
                null,
                "Slim Fit Chinos",
                "Men",
                55.00,
                55.00,
                0,
                4.4,
                78,
                "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800",
                List.of("https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800"),
                Arrays.asList("30", "32", "34", "36"),
                Arrays.asList("Khaki", "Navy", "Olive"),
                "KleviS.lk Basics",
                "Versatile slim fit chinos made from stretch cotton blend for maximum comfort.",
                true,
                false,
                false
            );

            Product p8 = new Product(
                null,
                "Oversized Sunglasses",
                "Accessories",
                24.99,
                30.00,
                17,
                4.7,
                112,
                "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800",
                List.of("https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800"),
                List.of("One Size"),
                Arrays.asList("Black", "Tortoise"),
                "KleviS.lk Accessories",
                "Chic oversized sunglasses with UV400 protection. Adds a touch of glamour to any outfit.",
                false,
                true,
                false
            );

            productRepository.saveAll(Arrays.asList(p1, p2, p3, p4, p5, p6, p7, p8));
            System.out.println("Default products seeded successfully!");
        }
    }
}
