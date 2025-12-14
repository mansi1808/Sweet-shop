package com.sweetshop.service;

import com.sweetshop.model.Sweet;
import com.sweetshop.repository.SweetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SweetService {
    @Autowired
    private SweetRepository sweetRepository;

    public List<Sweet> getAllSweets() {
        return sweetRepository.findAll();
    }

    public Optional<Sweet> getSweetById(Long id) {
        return sweetRepository.findById(id);
    }

    public Sweet addSweet(Sweet sweet) {
        return sweetRepository.save(sweet);
    }

    public Sweet updateSweet(Long id, Sweet sweetDetails) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found with id: " + id));

        sweet.setName(sweetDetails.getName());
        sweet.setCategory(sweetDetails.getCategory());
        sweet.setPrice(sweetDetails.getPrice());
        sweet.setQuantity(sweetDetails.getQuantity());
        sweet.setDescription(sweetDetails.getDescription());
        sweet.setImageUrl(sweetDetails.getImageUrl());

        return sweetRepository.save(sweet);
    }

    public void deleteSweet(Long id) {
        sweetRepository.deleteById(id);
    }

    public List<Sweet> searchSweets(String keyword) {
        return sweetRepository.search(keyword);
    }

    public Sweet purchaseSweet(Long id, int quantity) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found with id: " + id));

        if (sweet.getQuantity() < quantity) {
            throw new RuntimeException("Not enough stock available");
        }

        sweet.setQuantity(sweet.getQuantity() - quantity);
        return sweetRepository.save(sweet);
    }

    public Sweet restockSweet(Long id, int quantity) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found with id: " + id));

        sweet.setQuantity(sweet.getQuantity() + quantity);
        return sweetRepository.save(sweet);
    }
}
