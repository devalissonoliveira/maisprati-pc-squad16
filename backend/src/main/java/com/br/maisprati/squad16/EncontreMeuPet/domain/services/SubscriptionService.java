package com.br.maisprati.squad16.EncontreMeuPet.domain.services;

import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.SubscriptionDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions.SubscriptionAlreadyExistsException;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Subscription;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SubscriptionService {
    SubscriptionDTO create(SubscriptionDTO subscription) throws SubscriptionAlreadyExistsException;
    Optional<SubscriptionDTO> findById(Long id);
    List<SubscriptionDTO> findAll(User user);
    boolean cancel(Long subscriptionId, LocalDate date, String cancellationReason);
}
