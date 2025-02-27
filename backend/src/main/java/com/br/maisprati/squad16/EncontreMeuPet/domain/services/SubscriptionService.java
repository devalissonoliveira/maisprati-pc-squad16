package com.br.maisprati.squad16.EncontreMeuPet.domain.services;

import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.PetDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.SubscriptionDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.SubscriptionPetDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions.ApplicationException;
import com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions.SubscriptionAlreadyExistsException;
import com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions.SubscriptionDateInvalidException;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;

import java.util.List;
import java.util.Optional;

public interface SubscriptionService {
    SubscriptionDTO create(SubscriptionDTO subscription) throws SubscriptionAlreadyExistsException, SubscriptionDateInvalidException, ApplicationException;
    List<SubscriptionPetDTO> addPets(SubscriptionDTO subscription, List<Long> subscriptionPetIds, User user ) throws ApplicationException;
    void removePetFromSubscription(SubscriptionDTO subscription, PetDTO pet, User user) throws ApplicationException;
    Optional<SubscriptionDTO> findById(Long id);
    List<SubscriptionDTO> findAll(User user);
    boolean cancel(SubscriptionDTO subscription, User user);
}
