package com.ALM.library.springsecurity.repository;

import com.ALM.library.springsecurity.models.ERole;
import com.ALM.library.springsecurity.models.Role;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
