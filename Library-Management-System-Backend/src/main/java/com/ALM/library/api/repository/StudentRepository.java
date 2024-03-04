package com.ALM.library.api.repository;

import com.ALM.library.api.model.Book;
import com.ALM.library.api.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student,Long> {
    Student findStudentById(Long id);

    List<Student> findByUsernameContaining(String username);

    Student findStudentsByUsername(String username);
}
