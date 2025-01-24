package com.br.maisprati.squad16.EncontreMeuPet.domain.dtos;

import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Plan;

import java.math.BigDecimal;

public record PlanDTO(
        Long planId,
        String name,
        String description,
        BigDecimal monthlyPrice,
        BigDecimal annualPrice,
        Integer minPets,
        Integer maxPets
) {
    public static PlanDTO fromPlanModel(Plan plan) {
        return new PlanDTO(
                plan.getPlanId(),
                plan.getName(),
                plan.getDescription(),
                plan.getMonthlyPrice(),
                plan.getAnnualPrice(),
                plan.getMinPets(),
                plan.getMaxPets()
        );
    }
}
