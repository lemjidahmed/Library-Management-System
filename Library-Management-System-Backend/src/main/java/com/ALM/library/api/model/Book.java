package com.ALM.library.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Book")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Book {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "title")
  private String title;

  @ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
  @JsonIgnore
  @JoinColumn(name = "author_id", referencedColumnName = "id")
  private Author author;

  @Column(name = "status")
  private String status;

  @Column(name = "category")
  private String category;

  @Column(name = "description")
  private String description;

  @Column(name = "number-copies")
  private int numberCopies;

  @Lob
  @Column(name = "image")
  private byte[] image; // Image stored as byte array

}
