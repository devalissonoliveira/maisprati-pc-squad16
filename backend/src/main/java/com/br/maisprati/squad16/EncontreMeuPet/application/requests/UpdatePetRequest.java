package com.br.maisprati.squad16.EncontreMeuPet.application.requests;

import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.PetDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.enums.PetSpecies;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

public record UpdatePetRequest(
        @NotEmpty
        String name,
        @NotEmpty
        String species,
        @NotEmpty
        String breed,
        @NotNull @Min(0)
        int age,
        @NotNull
        Boolean hasPedigree,
        String pedigreeFile,
        @NotEmpty
        String observations,
        @NotEmpty
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        String registrationDate,
        @NotNull
        boolean active
) {
    public PetDTO toDTO() {
        return UpdatePetRequest.fromRequest(this);
    }
    public static PetDTO fromRequest(UpdatePetRequest request) {
        return new PetDTO(
                null,
                request.name,
                PetSpecies.valueOf(request.species),
                request.breed,
                request.age,
                request.observations,
                LocalDateTime.parse(request.registrationDate),
                request.active,
                null
        );
    }
}
