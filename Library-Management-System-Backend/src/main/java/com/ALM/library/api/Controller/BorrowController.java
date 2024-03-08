package com.ALM.library.api.Controller;

import com.ALM.library.api.model.Book;
import com.ALM.library.api.model.Borrow;
import com.ALM.library.api.model.FileInfo;
import com.ALM.library.api.model.Student;
import com.ALM.library.api.repository.BookRepository;
import com.ALM.library.api.repository.BorrowRepository;
import com.ALM.library.api.repository.StudentRepository;
import com.ALM.library.springsecurity.models.User;
import com.ALM.library.springsecurity.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/borrow")
public class BorrowController {

    @Autowired
    private BorrowRepository borrowRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository booksRepository;

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<String> borrowBook(@RequestBody Borrow borrow) {
        User user = userRepository.findUserById(borrow.getUserId());
        Book book = booksRepository.findBookById(borrow.getBookId());
        if(book!=null && user!=null){
            if (book.getNumberCopies() < 1) {
                String message="The book \"" + book.getTitle() + "\" is out of stock!";
                return new ResponseEntity<>(message, HttpStatus.OK);
            }

            book.borrowBook();
            booksRepository.save(book);

            Date currentDate = new Date();
            Date overdueDate = new Date();
            Calendar c = Calendar.getInstance();
            c.setTime(overdueDate);
            c.add(Calendar.DATE, 7);
            overdueDate = c.getTime();
            borrow.setIssueDate(currentDate);
            borrow.setDueDate(overdueDate);
            borrowRepository.save(borrow);
            String message=user.getUsername() + " has borrowed one copy of \"" + book.getTitle() + "\"!";
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<Borrow> getAllBorrow() {
        return borrowRepository.findAll();
    }

    @PutMapping
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public Borrow returnBook(@RequestBody Borrow borrow) {
        Borrow borrowBook = borrowRepository.findById(borrow.getBorrowId()).get();
        Book book = booksRepository.findById(borrowBook.getBookId()).get();

        book.returnBook();
        booksRepository.save(book);

        Date currentDate = new Date();
        borrowBook.setReturnDate(currentDate);
        return borrowRepository.save(borrowBook);
    }

    @GetMapping("user/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<Borrow> booksBorrowedByUser(@PathVariable Integer id) {
        return borrowRepository.findByUserId(id);
    }

    @GetMapping("book/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<Borrow> bookBorrowHistory(@PathVariable Integer id) {
        return borrowRepository.findByBookId(id);
    }
}
