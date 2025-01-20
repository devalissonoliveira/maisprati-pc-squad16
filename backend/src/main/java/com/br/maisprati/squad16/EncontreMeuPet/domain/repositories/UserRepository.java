package com.br.maisprati.squad16.EncontreMeuPet.domain.repositories;

import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<UserDetails> findByEmail(String email);
}
