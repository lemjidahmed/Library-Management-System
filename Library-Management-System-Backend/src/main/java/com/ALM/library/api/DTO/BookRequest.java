package com.ALM.library.api.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class BookRequest {

  private String title;
  private String authorName;

  private String status;
  private String category;

  private String description;
  private int numberCopies;
//  private String imageUrl;
  private MultipartFile file;
}
