package com.ALM.library.api.service;


import com.ALM.library.api.model.Author;
import com.ALM.library.api.repository.AuthorRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorService {
  @Autowired
  AuthorRepository authorRepository;
  public List<Author> getAllAuthors(){
    return authorRepository.findAll();
  }
  public List<Author> getAuthorByTitle(String name) {
    return authorRepository.findByNameContaining(name);
  }
  public Author addAuthor(Author Author) {
    authorRepository.save(Author);
    return Author;
  }
  public Author updateAuthor(Author Author) {
    authorRepository.save(Author);
    return Author;
  }

  public Optional<Author> getAuthorById(long id) {
    return authorRepository.findById(id);
  }

  public void deleteById(long id) {
    authorRepository.deleteById(id);
  }

  public void deleteAllAuthors(){
    authorRepository.deleteAll();
  }
}
