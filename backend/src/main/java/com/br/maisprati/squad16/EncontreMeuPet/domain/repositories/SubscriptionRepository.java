package com.br.maisprati.squad16.EncontreMeuPet.domain.repositories;

import com.br.maisprati.squad16.EncontreMeuPet.domain.enums.SubscriptionStatus;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Plan;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Subscription;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    Optional<Subscription> findBySubscriptionIdAndUser(Long id, User user);

    List<Subscription> findAllByUser(User user);

    List<Subscription> findAllByPlan(Plan user);

    List<Subscription> findByStatus(SubscriptionStatus status);

    Optional<Subscription> findByStatusAndUser(SubscriptionStatus status, User user);
}
