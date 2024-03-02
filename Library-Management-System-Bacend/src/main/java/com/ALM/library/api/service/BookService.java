package com.ALM.library.api.service;

import com.ALM.library.api.DTO.BookRequest;
import com.ALM.library.api.model.Author;
import com.ALM.library.api.model.Book;
import com.ALM.library.api.repository.AuthorRepository;
import com.ALM.library.api.repository.BookRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {
  @Autowired
  BookRepository bookRepository;
  @Autowired
  AuthorRepository authorRepository;
  public List<Book> getAllBooks(){
    return bookRepository.findAll();
  }
  public List<Book> getBookByTitle(String title) {
    return bookRepository.findByTitleContaining(title);
  }


  public Book addBook(BookRequest bookRequest) {
    Author author = authorRepository.findByName(bookRequest.getAuthor());

    if (author == null) {
      // If author is not found in the database, return an error or throw an exception
      throw new IllegalArgumentException("Author not found: " + bookRequest.getAuthor());
      // You can customize the exception type and message as needed
    }
    Book book=Book.builder()
        .title(bookRequest.getTitle())
        .author(author)
        .status(bookRequest.getStatus())
        .category(bookRequest.getDescription())
        .description(bookRequest.getDescription())
        .build();
    return bookRepository.save(book);
  }
  public Book updateBook(Book Book) {
    bookRepository.save(Book);
    return Book;

  }

  public Optional<Book> getBookById(long id) {
    return bookRepository.findById(id);
  }

  public void deleteById(long id) {
    bookRepository.deleteById(id);
  }

  public void deleteAllBooks(){
    bookRepository.deleteAll();
  }
}
