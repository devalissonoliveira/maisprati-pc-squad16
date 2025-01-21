package com.br.maisprati.squad16.EncontreMeuPet.domain.models;

import jakarta.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class SubscriptionPetId implements Serializable {

    private Long petId;
    private Long subscriptionId;

    public SubscriptionPetId() {
    }

    public SubscriptionPetId(Long petId, Long subscriptionId) {
        this.petId = petId;
        this.subscriptionId = subscriptionId;
    }

    public Long getPetId() {
        return petId;
    }

    public void setPetId(Long petId) {
        this.petId = petId;
    }

    public Long getSubscriptionId() {
        return subscriptionId;
    }

    public void setSubscriptionId(Long subscriptionId) {
        this.subscriptionId = subscriptionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SubscriptionPetId that = (SubscriptionPetId) o;

        if (!petId.equals(that.petId)) {
            return false;
        }
        return subscriptionId.equals(that.subscriptionId);
    }

    @Override
    public int hashCode() {
        int result = petId.hashCode();
        result = 31 * result + subscriptionId.hashCode();
        return result;
    }
}
