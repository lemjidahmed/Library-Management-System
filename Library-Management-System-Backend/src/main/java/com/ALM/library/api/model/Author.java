package com.ALM.library.api.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Author")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Author {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "name")
  private String name;

  @Column(name = "firstname")
  private  String firstname;

  @Column(name = "picture")
  private String picture;

  @OneToMany(mappedBy = "author", fetch = FetchType.LAZY,cascade = CascadeType.ALL)
  private List<Book> books = new ArrayList<>();

  @Column(name = "description")
  private String description;

}
