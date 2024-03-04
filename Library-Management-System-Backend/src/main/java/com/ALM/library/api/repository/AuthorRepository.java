package com.ALM.library.api.repository;

import com.ALM.library.api.model.Author;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author,Long> {
  List<Author> findByNameContaining(String name);
  Author findByName(String name);

}
