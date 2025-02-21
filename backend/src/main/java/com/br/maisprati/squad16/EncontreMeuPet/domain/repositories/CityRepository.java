package com.br.maisprati.squad16.EncontreMeuPet.domain.repositories;

import com.br.maisprati.squad16.EncontreMeuPet.domain.models.City;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.State;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CityRepository extends JpaRepository<City, Long> {

    Optional<City> findByNameAndState(String name, State state);
}
