package com.ALM.library.api.service;

import com.ALM.library.api.model.Book;
import com.ALM.library.api.model.Student;
import com.ALM.library.api.repository.BookRepository;
import com.ALM.library.api.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    BookRepository bookRepository;
    public void rentBook(Long id ,String bookName)
    {
        Student student=studentRepository.findStudentById(id);
        Book book=bookRepository.findBookByTitle(bookName);
        book.setNumberCopies(book.getNumberCopies()-1);
        student.getBooks().add(book);
        studentRepository.save(student);
        bookRepository.save(book);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }


    public Student addStudent(Student studentRequest) {

        Student student=Student.builder()
                .username(studentRequest.getUsername())
                .build();
        return studentRepository.save(student);
    }

    public Student getStudentById(long id) {
       return  this.studentRepository.findStudentById(id);
    }

    public void deleteById(long id) {

    }

    public void deleteAllStudents() {
        this.studentRepository.deleteAll();
    }

    public void updateStudent(Student student) {
        studentRepository.save(student);
    }

    public List<Student> getStudentByUsername(String username) {
        return this.studentRepository.findByUsernameContaining(username);
    }
}
