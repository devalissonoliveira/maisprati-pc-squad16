package com.br.maisprati.squad16.EncontreMeuPet.domain.dtos;

import com.br.maisprati.squad16.EncontreMeuPet.domain.enums.Roles;

public record ProfileDTO(
        String name,
        String email,
        Roles role,
        SubscriptionDTO activeSubscription
) {
}
