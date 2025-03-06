package com.br.maisprati.squad16.EncontreMeuPet.domain.repositories;

import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Pet;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PetRepository extends JpaRepository<Pet, Long> {

    public List<Pet> findAllByActiveAndUser(Boolean active, User user);
    public List<Pet> findAllByUser(User user);

    Optional<Pet> findByPetIdAndUser(Long id, User user);

    List<Pet> findAllByPetIdInAndUser(List<Long> id, User user);

    Optional<Pet> findByPetIdAndUserAndActiveTrue(Long id, User user);
}
