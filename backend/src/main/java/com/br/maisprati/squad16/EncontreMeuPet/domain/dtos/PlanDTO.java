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
        Integer maxPets,
        Boolean active
) {
    public Plan toModel() {
        return PlanDTO.toFromDTOToModel(this);
    }
    public static Plan toFromDTOToModel(PlanDTO planDTO)
    {
        var plan = new Plan();
        plan.setName(planDTO.name);
        plan.setDescription(planDTO.description);
        plan.setMonthlyPrice(planDTO.monthlyPrice);
        plan.setAnnualPrice(planDTO.annualPrice);
        plan.setMinPets(planDTO.minPets);
        plan.setMaxPets(planDTO.maxPets);
        plan.setActive(planDTO.active);
        return plan;
    }
    public static PlanDTO fromPlanModel(Plan plan) {
        return new PlanDTO(
                plan.getPlanId(),
                plan.getName(),
                plan.getDescription(),
                plan.getMonthlyPrice(),
                plan.getAnnualPrice(),
                plan.getMinPets(),
                plan.getMaxPets(),
                plan.isActive()
        );
    }
}
