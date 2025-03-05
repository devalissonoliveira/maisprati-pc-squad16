package com.br.maisprati.squad16.EncontreMeuPet.domain.dtos;

public record ProfileDTO(
        String name,
        String email,
        SubscriptionDTO activeSubscription
) {
}
