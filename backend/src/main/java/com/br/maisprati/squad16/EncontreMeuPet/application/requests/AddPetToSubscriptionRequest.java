package com.br.maisprati.squad16.EncontreMeuPet.application.requests;

import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.SubscriptionDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Pet;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Subscription;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record AddPetToSubscriptionRequest(
        @NotEmpty
        List< @NotNull Long> petIds
) { }
