package com.br.maisprati.squad16.EncontreMeuPet.application.requests;

import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.PlanDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Plan;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;
import java.math.BigDecimal;

public record CreatePlanRequest(
        @NotNull
        @NotBlank
        @Length(min = 3)
        String name,
        @NotNull
        @NotBlank
        @Length(min = 3)
        String description,
        @NotNull
        @Min(value = 0)
        BigDecimal monthlyPrice,
        @NotNull
        @Min(value = 0)
        BigDecimal annualPrice,
        @NotNull
        @Min(value = 0)
        Integer minPets,
        @NotNull
        @Min(value = 0)
        Integer maxPets) {

    public Plan toModel() {
        return CreatePlanRequest.fromRequest(this);
    }

    public static Plan fromRequest(CreatePlanRequest request) {
        var plan = new Plan();
        plan.setMaxPets(request.maxPets);
        plan.setMinPets(request.minPets);
        plan.setDescription(request.description);
        plan.setName(request.name);
        plan.setAnnualPrice(request.annualPrice);
        plan.setMonthlyPrice(request.monthlyPrice);
        plan.setActive(true);
        return plan;
    }

    public PlanDTO toDTO() {
        return CreatePlanRequest.fromRequestToDTO(this);
    }

    public static PlanDTO fromRequestToDTO(CreatePlanRequest request) {
        return new PlanDTO(
                null,
                request.name,
                request.description,
                request.monthlyPrice,
                request.annualPrice,
                request.minPets,
                request.maxPets,
                true
        );
    }
}
