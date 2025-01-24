package com.br.maisprati.squad16.EncontreMeuPet.domain.dtos;

import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Plan;

import java.math.BigDecimal;

public record PlanUpdateDTO(
        String name,
        String description,
        BigDecimal monthlyPrice,
        BigDecimal annualPrice,
        Integer minPets,
        Integer maxPets,
        Boolean active
) {}
