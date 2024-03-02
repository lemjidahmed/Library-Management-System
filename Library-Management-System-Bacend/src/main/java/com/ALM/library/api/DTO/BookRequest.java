package com.ALM.library.api.DTO;

import lombok.Data;

@Data
public class BookRequest {

  private String title;
  private String author;

  private String status;
  private String category;

  private String description;
}
