package com.br.maisprati.squad16.EncontreMeuPet.application.requests;

import jakarta.validation.constraints.NotNull;

public record RemovePetFromSubscriptionRequest(
        @NotNull
        Long petId
) {
}
