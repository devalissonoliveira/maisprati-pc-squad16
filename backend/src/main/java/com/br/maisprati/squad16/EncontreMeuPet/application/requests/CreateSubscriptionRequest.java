package com.br.maisprati.squad16.EncontreMeuPet.application.requests;

import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.SubscriptionDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.enums.PeriodType;
import com.br.maisprati.squad16.EncontreMeuPet.domain.enums.SubscriptionStatus;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Subscription;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CreateSubscriptionRequest(
        @NotNull
        Long planId,
        @NotNull
        String periodType
) {
        public static SubscriptionDTO toDTO(CreateSubscriptionRequest createSubscriptionRequest, User user)
        {
                return new SubscriptionDTO(
                      null,
                        user.getUserId(),
                        createSubscriptionRequest.planId,
                        LocalDate.now(),
                        LocalDate.now(),
                        PeriodType.valueOf(PeriodType.class, createSubscriptionRequest.periodType),
                        BigDecimal.ZERO,
                        null,
                        null,
                        null,
                        null
                );
        }
}
