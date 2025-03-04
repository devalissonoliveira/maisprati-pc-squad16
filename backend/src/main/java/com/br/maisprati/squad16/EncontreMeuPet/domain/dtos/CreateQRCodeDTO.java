package com.br.maisprati.squad16.EncontreMeuPet.domain.dtos;

import jakarta.validation.constraints.NotNull;

public record CreateQRCodeDTO(
        @NotNull
        Long petId) {

}
