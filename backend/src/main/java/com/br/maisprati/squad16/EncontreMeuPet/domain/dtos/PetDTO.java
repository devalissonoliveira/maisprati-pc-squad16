package com.br.maisprati.squad16.EncontreMeuPet.domain.dtos;

import com.br.maisprati.squad16.EncontreMeuPet.domain.enums.PetSpecies;
import java.time.LocalDateTime;

public record PetDTO(
        Long id,
        String name,
        PetSpecies species,
        String breed,
        Integer age,
        String observations,
        LocalDateTime registrationDate,
        boolean active) {

}
