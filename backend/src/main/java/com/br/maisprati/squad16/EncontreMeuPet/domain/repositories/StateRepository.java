package com.br.maisprati.squad16.EncontreMeuPet.domain.repositories;

import com.br.maisprati.squad16.EncontreMeuPet.domain.models.State;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StateRepository extends JpaRepository<State, Long> {

    Optional<State> findByStateCode(String stateCode);
}
