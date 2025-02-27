package com.br.maisprati.squad16.EncontreMeuPet.domain.services.implementation;

import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.PetDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.SubscriptionDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.SubscriptionPetDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.enums.Roles;
import com.br.maisprati.squad16.EncontreMeuPet.domain.enums.SubscriptionStatus;
import com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions.ApplicationException;
import com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions.SubscriptionAlreadyExistsException;
import com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions.SubscriptionDateInvalidException;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Subscription;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.SubscriptionPet;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.SubscriptionPetId;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;
import com.br.maisprati.squad16.EncontreMeuPet.domain.repositories.*;
import com.br.maisprati.squad16.EncontreMeuPet.domain.services.SubscriptionService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final PlanRepository planRepository;
    private final PetRepository petRepository;
    private final SubscriptionPetRepository subscriptionPetRepository;

    public SubscriptionServiceImpl(SubscriptionRepository subscriptionRepository, UserRepository userRepository, PlanRepository planRepository,
                                   PetRepository petRepository,
                                   SubscriptionPetRepository subscriptionPetRepository
                                   ) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
        this.planRepository = planRepository;
        this.petRepository = petRepository;
        this.subscriptionPetRepository = subscriptionPetRepository;
    }
    @Transactional
    @Override
    public SubscriptionDTO create(SubscriptionDTO subscription) throws SubscriptionAlreadyExistsException, SubscriptionDateInvalidException, ApplicationException {
        if(!subscription.isValidRangeDate()){
            throw new SubscriptionDateInvalidException(
                    subscription.startDate(),
                    subscription.endDate()
            );
        }
        var user = this.userRepository.findById(subscription.userId()).get();
        var alreadyExists = this.subscriptionRepository.findByStatusAndUser(
                SubscriptionStatus.ACTIVE,
                user
        );
        if(alreadyExists.isPresent()){
            throw new SubscriptionAlreadyExistsException();
        }
        var plan = this.planRepository.findById(subscription.planId()).orElseThrow(() -> new ApplicationException("Plano não encontrado"));
        var sub = SubscriptionDTO.toModel(
                subscription,
                user,
                plan
        );
        sub.setStatus(
                SubscriptionStatus.ACTIVE
        );
        return  SubscriptionDTO.toDTO(this.subscriptionRepository.save(sub));
    }

    @Override
    @Transactional
    public List<SubscriptionPetDTO> addPets(
                                         SubscriptionDTO subscription,
                                         List<Long> subscriptionPetIds,
                                         User user) throws ApplicationException {
        if(subscription.status() != SubscriptionStatus.ACTIVE){
            throw new ApplicationException("Seu plano não está mais ativo.");
        }
        var plan = this.planRepository.findById(subscription.planId());
        if(plan.isEmpty()){
            throw new ApplicationException("Plano não encontrado", HttpStatus.NOT_FOUND);
        }
        var pets = this.petRepository.findAllByPetIdInAndUser(subscriptionPetIds, user).stream().map(PetDTO::toDTO).toList();
        if(!plan.get().isActive())
        {
            throw new ApplicationException("Plano desativado.");
        }
        if(plan.get().getMaxPets() < pets.size() ){
            throw new ApplicationException("Seu plano só suporta " + plan.get().getMaxPets() + " animais.");
        }
        var activePets = this.subscriptionPetRepository.getAllBySubscriptionAndRemovalDateIsNull(
                subscription.toModel()
        );
        for (var activePet: activePets){
            if( subscriptionPetIds.contains(activePet.getId().getPetId())  ) {
                throw new ApplicationException("O animal \"" + activePet.getPet().getName() + "\" já está cadastado no plano.");
            }
        }
        if(plan.get().getMaxPets() <= activePets.size())
        {
            throw new ApplicationException("Você tem "+ activePets.size() + " animal(is) cadastrado(s), e o seu plano só suporta " + plan.get().getMaxPets() + " animal(is).");
        }

        var subscriptions = pets.stream().map(petDTO -> {
            var petModel = new SubscriptionPet();
            petModel.setSubscription(subscription.toModel());
            petModel.setPet(petDTO.toModel());
            petModel.setInclusionDate(LocalDate.now());
            var id = new SubscriptionPetId();
            id.setPetId(petDTO.petId());
            id.setSubscriptionId(subscription.subscriptionId());
            petModel.setId(id);
            return petModel;
        }).collect(Collectors.toList());
        return this.subscriptionPetRepository.saveAll(subscriptions).stream().map(SubscriptionPetDTO::toDTO).collect(Collectors.toList());
    }

    @Override
    public void removePetFromSubscription(SubscriptionDTO subscription, PetDTO pet, User user) throws ApplicationException
    {
        var sub = this.subscriptionRepository.findBySubscriptionIdAndUser(
                subscription.subscriptionId(),
                user
        ).orElseThrow(() -> new ApplicationException("Plano não econtrado", HttpStatus.NOT_FOUND));
        if(sub.getStatus() != SubscriptionStatus.ACTIVE){
            throw new ApplicationException("Plano não desativado.");
        }
        var subPets = this.subscriptionPetRepository.getAllBySubscriptionAndRemovalDateIsNull(
                sub
        );
        if(subPets.isEmpty()){
            throw new ApplicationException("Plano sem animais.");
        }
        for (var activePet: subPets){
            if(Objects.equals(pet.petId(), activePet.getId().getPetId())) {
                activePet.setRemovalDate(LocalDate.now());
                this.subscriptionPetRepository.save(activePet);
            }
        }
    }

    @Override
    public Optional<SubscriptionDTO> findById(Long id) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user.getRole().equals(Roles.ADMIN)) {
            return this.subscriptionRepository
                    .findById(id)
                    .map(SubscriptionDTO::toDTO);
        }
        return this.subscriptionRepository
                .findBySubscriptionIdAndUser(id, user).map(SubscriptionDTO::toDTO);
    }

    @Override
    public List<SubscriptionDTO> findAll(User user) {
        if (user.getRole().equals(Roles.ADMIN)) {
            return this.subscriptionRepository.findAll().stream().map(subModel -> {
                var pets = this.subscriptionPetRepository.getAllBySubscription(subModel).stream().map(SubscriptionPetDTO::toDTO).collect(Collectors.toList());
                return SubscriptionDTO.toDTO(subModel, pets);
            }).collect(Collectors.toList());
        }
        return this.subscriptionRepository.findAllByUser(user).stream().map(subModel -> {
            var pets = this.subscriptionPetRepository.getAllBySubscription(subModel).stream().map(SubscriptionPetDTO::toDTO).collect(Collectors.toList());
            return SubscriptionDTO.toDTO(subModel, pets);
        }).collect(Collectors.toList());
    }
    @Transactional
    @Override
    public boolean cancel(SubscriptionDTO subscriptionDTO, User user) {
        var subscriptionD = this.subscriptionRepository.findBySubscriptionIdAndUser(subscriptionDTO.subscriptionId(), user);
        if(subscriptionD.isEmpty()){
            return false;
        }
        var subscription = subscriptionD.get();
        if (subscription.getStatus().equals(SubscriptionStatus.CANCELLED)) {
            return false;
        }
        subscription.setStatus(
                SubscriptionStatus.CANCELLED
        );
        subscription.setCancellationDate(subscriptionDTO.cancellationDate());
        subscription.setCancellationReason(subscriptionDTO.cancellationReason());
        this.subscriptionRepository.saveAndFlush(subscription);
        return true;
    }
}
