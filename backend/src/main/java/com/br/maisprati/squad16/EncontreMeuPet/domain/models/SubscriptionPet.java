package com.br.maisprati.squad16.EncontreMeuPet.domain.models;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "subscription_pets")
public class SubscriptionPet {

   @EmbeddedId
   private SubscriptionPetId id;

   @ManyToOne(fetch = FetchType.LAZY)
   @MapsId("petId")
   @JoinColumn(name = "pet_id")
   private Pet pet;

   @ManyToOne(fetch = FetchType.LAZY)
   @MapsId("subscriptionId")
   @JoinColumn(name = "subscription_id")
   private Subscription subscription;

   @Column(name = "inclusion_date", nullable = false)
   private LocalDate inclusionDate;

   @Column(name = "removal_date")
   private LocalDate removalDate;

   public SubscriptionPet() {
   }

   public SubscriptionPetId getId() {
       return id;
   }

   public void setId(SubscriptionPetId id) {
       this.id = id;
   }

   public Pet getPet() {
       return pet;
   }

   public void setPet(Pet pet) {
       this.pet = pet;
   }

   public Subscription getSubscription() {
       return subscription;
   }

   public void setSubscription(Subscription subscription) {
       this.subscription = subscription;
   }

   public LocalDate getInclusionDate() {
       return inclusionDate;
   }

   public void setInclusionDate(LocalDate inclusionDate) {
       this.inclusionDate = inclusionDate;
   }

   public LocalDate getRemovalDate() {
       return removalDate;
   }

   public void setRemovalDate(LocalDate removalDate) {
       this.removalDate = removalDate;
   }

   @Override
   public boolean equals(Object o) {
       if (this == o) return true;
       if (o == null || getClass() != o.getClass()) return false;

       SubscriptionPet that = (SubscriptionPet) o;

       return id != null ? id.equals(that.id) : that.id == null;
   }

   @Override
   public int hashCode() {
       return id != null ? id.hashCode() : 0;
   }

   @Override
   public String toString() {
       return "SubscriptionPet{" +
               "pet=" + pet.getName() +
               ", subscription=" + subscription.getSubscriptionId() +
               ", inclusionDate=" + inclusionDate +
               ", removalDate=" + removalDate +
               '}';
   }
}