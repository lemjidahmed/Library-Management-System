package com.ALM.library.api.repository;

import com.ALM.library.api.model.Book;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book,Long> {
  List<Book> findByTitleContaining(String title);
  Book findBookByTitle(String title);
  Book findBookById(Long id);
  List<Book> findBooksByAuthorId(long id);

}
