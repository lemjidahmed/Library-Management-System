package com.ALM.library.api.repository;


import com.ALM.library.api.model.Borrow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BorrowRepository extends JpaRepository<Borrow, Long> {
    List<Borrow> findByBookId(long bookId);

    List<Borrow> findByUserId(long id);
}
