package com.ALM.library.api.Controller;

import com.ALM.library.api.DTO.BookRequest;
import com.ALM.library.api.model.Book;
import com.ALM.library.api.service.BookService;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api")
public class BookController {
  @Autowired
  BookService bookService;

  @GetMapping("/books")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<List<Book>> getAllBooks(@RequestParam(required = false) String title) {
    try {
      List<Book> books = new ArrayList<Book>();

      if (title == null)
        bookService.getAllBooks().forEach(books::add);
      else
        bookService.getBookByTitle(title).forEach(books::add);

      if (books.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(books, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/books/{id}")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<Book> getBookById(@PathVariable("id") long id) {
    Optional<Book> Book = bookService.getBookById(id);

    if (Book.isPresent()) {
      return new ResponseEntity<>(Book.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
  @PostMapping("/books")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<Book> createBook(@RequestBody BookRequest bookRequest)
  {

    try {
      Book book = bookService
          .addBook(bookRequest);
      return new ResponseEntity<>(book, HttpStatus.CREATED);
    } catch (IllegalArgumentException e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("/books/{id}")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<Book> updateBook(@PathVariable("id") long id, @RequestBody Book Book) {
    Optional<Book> BookData = bookService.getBookById(id);

    if (BookData.isPresent()) {
      Book _Book = BookData.get();
      _Book.setTitle(Book.getTitle());
      _Book.setDescription(Book.getDescription());
      return new ResponseEntity<>(bookService.updateBook(_Book), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/books/{id}")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<HttpStatus> deleteBook(@PathVariable("id") long id) {
    try {
      bookService.deleteById(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/books")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<HttpStatus> deleteAllBooks() {
    try {
      bookService.deleteAllBooks();
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

}
