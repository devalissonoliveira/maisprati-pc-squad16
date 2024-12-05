package com.br.maisprati.squad16.LanceNoTempo.domain.repositories;

import com.br.maisprati.squad16.LanceNoTempo.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<UserDetails> findByEmail(String email);
}