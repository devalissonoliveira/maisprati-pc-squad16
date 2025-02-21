package com.br.maisprati.squad16.EncontreMeuPet.domain.dtos;

import jakarta.validation.constraints.NotBlank;

public record UpdatePetDTO(
        @NotBlank
        String name,
        String breed,
        Integer age,
        String observations) {

}
