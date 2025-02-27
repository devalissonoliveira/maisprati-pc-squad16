package com.br.maisprati.squad16.EncontreMeuPet.domain.repositories;

import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Subscription;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.SubscriptionPet;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.SubscriptionPetId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubscriptionPetRepository extends JpaRepository<SubscriptionPet, SubscriptionPetId>
{
    List<SubscriptionPet> getAllBySubscriptionAndRemovalDateIsNull(Subscription subscription);
}
