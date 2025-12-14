package com.sweetshop.controller;

import com.sweetshop.model.Sweet;
import com.sweetshop.service.SweetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/sweets")
public class SweetController {
    @Autowired
    private SweetService sweetService;

    @GetMapping
    public List<Sweet> getAllSweets() {
        return sweetService.getAllSweets();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sweet> getSweetById(@PathVariable Long id) {
        return sweetService.getSweetById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<Sweet> searchSweets(@RequestParam String query) {
        return sweetService.searchSweets(query);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Sweet addSweet(@RequestBody Sweet sweet) {
        return sweetService.addSweet(sweet);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Sweet> updateSweet(@PathVariable Long id, @RequestBody Sweet sweetDetails) {
        try {
            return ResponseEntity.ok(sweetService.updateSweet(id, sweetDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteSweet(@PathVariable Long id) {
        sweetService.deleteSweet(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/purchase")
    public ResponseEntity<?> purchaseSweet(@PathVariable Long id) {
        try {
            // Default purchase quantity 1 for now, or could take from body
            return ResponseEntity.ok(sweetService.purchaseSweet(id, 1));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/restock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> restockSweet(@PathVariable Long id, @RequestBody Integer quantity) {
        try {
            return ResponseEntity.ok(sweetService.restockSweet(id, quantity));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
