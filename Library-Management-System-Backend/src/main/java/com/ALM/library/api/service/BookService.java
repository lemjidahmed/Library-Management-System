package com.ALM.library.api.service;

import com.ALM.library.api.DTO.BookRequest;
import com.ALM.library.api.model.Author;
import com.ALM.library.api.model.Book;
import com.ALM.library.api.repository.AuthorRepository;
import com.ALM.library.api.repository.BookRepository;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

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


//  public Book addBook(BookRequest bookRequest) {
//    Author author = authorRepository.findByName(bookRequest.getAuthorName());
//
//    if (author == null) {
//      // If author is not found in the database, return an error or throw an exception
//      throw new IllegalArgumentException("Author not found: " + bookRequest.getAuthorName());
//      // You can customize the exception type and message as needed
//    }
//
//    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//    byte[] buffer = new byte[4096]; // Buffer size
//    int bytesRead;
//
//    // Read bytes from the input stream and write them to the output stream
//    try {
//      while ((bytesRead = bookRequest.getFile().getInputStream().read(buffer)) != -1) {
//        outputStream.write(buffer, 0, bytesRead);
//      }
//    } finally {
//      outputStream.close();
//    }
//    Book book=Book.builder()
//            .title(bookRequest.getTitle())
//            .author(author)
//            .status(bookRequest.getStatus())
//            .category(bookRequest.getCategory())
//            .description(bookRequest.getDescription())
//            .numberCopies(bookRequest.getNumberCopies())
//            .image(outputStream.toByteArray())
//            .build();
//    return bookRepository.save(book);
//  }

  public Book addBook(BookRequest bookRequest) throws IOException {
    Author author = authorRepository.findByName(bookRequest.getAuthorName());

    if (author == null) {
      throw new IllegalArgumentException("Author not found: " + bookRequest.getAuthorName());
    }

//    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//    try (InputStream inputStream = bookRequest.getFile().getInputStream()) {
//      byte[] buffer = new byte[4096]; // Buffer size
//      int bytesRead;
//
//      // Read bytes from the input stream and write them to the output stream in chunks
//      while ((bytesRead = inputStream.read(buffer)) != -1) {
//        outputStream.write(buffer, 0, bytesRead);
//      }
//    } catch (IOException e) {
//      throw new RuntimeException("Error reading file", e);
//    }

    Book book = Book.builder()
            .title(bookRequest.getTitle())
            .author(author)
            .status(bookRequest.getStatus())
            .category(bookRequest.getCategory())
            .description(bookRequest.getDescription())
            .numberCopies(bookRequest.getNumberCopies())
            .image(bookRequest.getFile().getBytes())
            .build();

    return bookRepository.save(book);
  }

//  public Book  addBookWithImage(BookRequest bookRequest)
//  {
//    Author author = authorRepository.findByName(bookRequest.getAuthorName());
//
//    if (author == null) {
//      // If author is not found in the database, return an error or throw an exception
//      throw new IllegalArgumentException("Author not found: " + author);
//      // You can customize the exception type and message as needed
//    }
//    Book book = new Book();
//    String fileName = StringUtils.cleanPath(bookRequest.getFile().getOriginalFilename());
//    if(fileName.contains(".."))
//    {
//      System.out.println("not a a valid file");
//    }
//    try {
//      book.setImage(Base64.getEncoder().encodeToString(bookRequest.getFile().getBytes()));
//    } catch (IOException e) {
//      e.printStackTrace();
//    }
//    book.setTitle(bookRequest.getTitle());
//    book.setAuthor(author);
//    book.setStatus(bookRequest.getStatus());
//    book.setCategory(bookRequest.getCategory());
//    book.setDescription(bookRequest.getDescription());
//    book.setNumberCopies(bookRequest.getNumberCopies());
//    return bookRepository.save(book);
//  }

  public Book updateBook(Book Book) {
    bookRepository.save(Book);
    return Book;

  }

  public Book getBookById(long id) {
    return bookRepository.findBookById(id);
  }

  public void deleteById(long id) {
    bookRepository.deleteById(id);
  }

  public void deleteAllBooks(){
    bookRepository.deleteAll();
  }
}
