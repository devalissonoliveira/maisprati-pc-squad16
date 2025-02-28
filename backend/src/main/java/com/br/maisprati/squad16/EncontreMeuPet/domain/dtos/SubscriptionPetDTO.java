package com.br.maisprati.squad16.EncontreMeuPet.domain.dtos;

import com.br.maisprati.squad16.EncontreMeuPet.domain.models.SubscriptionPet;

import java.time.LocalDate;

public record SubscriptionPetDTO(
        PetDTO petDTO,
        SubscriptionDTO subscriptionDTO,
        LocalDate inclusionDate,
        LocalDate removalDate
) {
    public static SubscriptionPet toModel(
            SubscriptionPetDTO subscriptionPetDTO
    )
    {
        var subscriptionPet = new SubscriptionPet();
        subscriptionPet.setPet(subscriptionPetDTO.petDTO.toModel());
        subscriptionPet.setSubscription(subscriptionPetDTO.subscriptionDTO.toModel());
        subscriptionPet.setInclusionDate(subscriptionPetDTO.inclusionDate);
        subscriptionPet.setRemovalDate(subscriptionPetDTO.removalDate);
        return subscriptionPet;
    }
    public static SubscriptionPetDTO toDTO(SubscriptionPet subscriptionPet)
    {
         return new SubscriptionPetDTO(
                 PetDTO.toDTO(subscriptionPet.getPet()),
                 SubscriptionDTO.toDTO(subscriptionPet.getSubscription()),
                 subscriptionPet.getInclusionDate(),
                 subscriptionPet.getRemovalDate()
         );
    }
    public SubscriptionPet toModel()
    {
        return toModel(this);
    }
}
