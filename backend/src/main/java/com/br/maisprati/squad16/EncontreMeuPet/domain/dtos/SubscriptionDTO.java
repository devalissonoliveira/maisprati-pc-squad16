package com.br.maisprati.squad16.EncontreMeuPet.domain.dtos;

import com.br.maisprati.squad16.EncontreMeuPet.domain.enums.PeriodType;
import com.br.maisprati.squad16.EncontreMeuPet.domain.enums.SubscriptionStatus;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Plan;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Subscription;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.function.Function;

public record SubscriptionDTO(
        Long subscriptionId,
        Long userId,
        Long planId,
        LocalDate startDate,
        LocalDate endDate,
        PeriodType periodType,
        BigDecimal amountPaid,
        SubscriptionStatus status,
        LocalDate cancellationDate,
        String cancellationReason
) {
    public static SubscriptionDTO toDTO(Subscription subscription) {
        return new SubscriptionDTO(
                subscription.getSubscriptionId(),
                subscription.getUser().getUserId(),
                subscription.getPlan().getPlanId(),
                subscription.getStartDate(),
                subscription.getEndDate(),
                subscription.getPeriodType(),
                subscription.getAmountPaid(),
                subscription.getStatus(),
                subscription.getCancellationDate(),
                subscription.getCancellationReason()
        );
    }
    public Subscription toModel() {
        return toModel(this);
    }
    public static Subscription toModel(SubscriptionDTO subscription) {
        var sub = new Subscription();
        sub.setSubscriptionId(subscription.subscriptionId);
        sub.setAmountPaid(subscription.amountPaid());
        sub.setStatus(subscription.status());
        sub.setStartDate(subscription.startDate());
        sub.setEndDate(subscription.endDate());
        sub.setPeriodType(subscription.periodType());
        sub.setCancellationDate(subscription.cancellationDate());
        sub.setCancellationReason(subscription.cancellationReason());
        return sub;
    }
    public static Subscription toModel(SubscriptionDTO subscription, Function< Long, User> userFunction, Function<Long, Plan> planFunction) {
        Subscription sub = toModel(subscription);
        var user = userFunction.apply(subscription.userId);
        var plan = planFunction.apply(subscription.planId);
        sub.setUser(user);
        sub.setPlan(plan);
        return sub;
    }
    public static Subscription toModel(SubscriptionDTO subscription, User user, Plan plan) {
        Subscription sub = toModel(subscription);
        sub.setUser(user);
        sub.setPlan(plan);
        return sub;
    }
    public boolean isValidRangeDate()
    {
        var model = SubscriptionDTO.toModel(this);
        return  model.getStartDate().isBefore(model.getEndDate());
    }
}
