package com.ALM.library.api.Controller;


import com.ALM.library.api.model.Author;
import com.ALM.library.api.service.AuthorService;
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
public class AuthorController {
  @Autowired
  AuthorService authorService;

  @GetMapping("/authors")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<List<Author>> getAllAuthors(@RequestParam(required = false) String title) {
    try {
      List<Author> Authors = new ArrayList<Author>();

      if (title == null)
        authorService.getAllAuthors().forEach(Authors::add);
      else
        authorService.getAuthorByTitle(title).forEach(Authors::add);

      if (Authors.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(Authors, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/authors/{id}")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<Author> getAuthorById(@PathVariable("id") long id) {
    Optional<Author> Author = authorService.getAuthorById(id);

    if (Author.isPresent()) {
      return new ResponseEntity<>(Author.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
  @PostMapping("/authors")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<Author> createAuthor(@RequestBody Author author)
  {

    try {
      Author _Author = authorService
          .addAuthor(author);
      return new ResponseEntity<>(_Author, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("/authors/{id}")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<Author> updateAuthor(@PathVariable("id") long id, @RequestBody Author Author) {
    Optional<Author> AuthorData = authorService.getAuthorById(id);

    if (AuthorData.isPresent()) {
      Author _Author = AuthorData.get();
      _Author.setName(Author.getName());
      _Author.setDescription(Author.getDescription());
      return new ResponseEntity<>(authorService.updateAuthor(_Author), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/authors/{id}")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<HttpStatus> deleteAuthor(@PathVariable("id") long id) {
    try {
      authorService.deleteById(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/authors")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<HttpStatus> deleteAllAuthors() {
    try {
      authorService.deleteAllAuthors();
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

}
