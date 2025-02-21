package com.br.maisprati.squad16.EncontreMeuPet.domain.services;

import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.SubscriptionDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions.SubscriptionAlreadyExistsException;
import com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions.SubscriptionDateInvalidException;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;
import java.util.List;
import java.util.Optional;

public interface SubscriptionService {

    SubscriptionDTO create(SubscriptionDTO subscription) throws SubscriptionAlreadyExistsException, SubscriptionDateInvalidException;

    Optional<SubscriptionDTO> findById(Long id);

    List<SubscriptionDTO> findAll(User user);

    boolean cancel(SubscriptionDTO subscription, User user);
}
