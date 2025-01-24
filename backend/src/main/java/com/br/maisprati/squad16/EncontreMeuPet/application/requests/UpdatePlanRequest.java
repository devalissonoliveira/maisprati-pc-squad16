package com.br.maisprati.squad16.EncontreMeuPet.application.requests;

import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.PlanUpdateDTO;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record UpdatePlanRequest(
        @NotBlank
        String name,
        @NotBlank
        String description,
        @NotNull
        @Min(0)
        BigDecimal monthlyPrice,
        @Min(0)
        BigDecimal annualPrice,
        @NotNull
        @Min(0)
        Integer minPets,
        @NotNull
        @Min(0)
        Integer maxPets,
        @NotNull
        Boolean active
) {
    public PlanUpdateDTO toUpdateDTO() {
        return UpdatePlanRequest.fromRequest(this);
    }
    public static PlanUpdateDTO fromRequest(UpdatePlanRequest request)
    {
        return new PlanUpdateDTO(
                request.name(),
                request.description(),
                request.monthlyPrice(),
                request.annualPrice(),
                request.minPets(),
                request.maxPets(),
                request.active()
        );
    }
}
