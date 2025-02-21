package com.br.maisprati.squad16.EncontreMeuPet.domain.dtos;

import com.br.maisprati.squad16.EncontreMeuPet.domain.enums.PetSpecies;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreatePetDTO(
        @NotBlank
        String name,
        @NotNull
        PetSpecies species,
        String breed,
        Integer age,
        String observations) {

}
