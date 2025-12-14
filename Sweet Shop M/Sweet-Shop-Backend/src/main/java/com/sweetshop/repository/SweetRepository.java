package com.sweetshop.repository;

import com.sweetshop.model.Sweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SweetRepository extends JpaRepository<Sweet, Long> {
    @Query("SELECT s FROM Sweet s WHERE " +
            "LOWER(s.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(s.category) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Sweet> search(String keyword);
}
