package com.br.maisprati.squad16.EncontreMeuPet.application.requests;

import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.SubscriptionDTO;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDate;

public record CancelSubscriptionRequest(
        @NotNull
        @NotEmpty
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        String cancellationDate,
        @NotNull
        @NotEmpty
        String cancellationReason) {

    public static SubscriptionDTO toDTO(
            CancelSubscriptionRequest subscription,
            Long subscriptionId
    ) {
        return new SubscriptionDTO(
                subscriptionId,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                LocalDate.parse(subscription.cancellationDate),
                subscription.cancellationReason
        );
    }
}
