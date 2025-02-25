package com.br.maisprati.squad16.EncontreMeuPet.domain.services.implementation;

import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.SubscriptionDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.enums.Roles;
import com.br.maisprati.squad16.EncontreMeuPet.domain.enums.SubscriptionStatus;
import com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions.SubscriptionAlreadyExistsException;
import com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions.SubscriptionDateInvalidException;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;
import com.br.maisprati.squad16.EncontreMeuPet.domain.repositories.PlanRepository;
import com.br.maisprati.squad16.EncontreMeuPet.domain.repositories.SubscriptionRepository;
import com.br.maisprati.squad16.EncontreMeuPet.domain.repositories.UserRepository;
import com.br.maisprati.squad16.EncontreMeuPet.domain.services.SubscriptionService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final PlanRepository planRepository;

    public SubscriptionServiceImpl(SubscriptionRepository subscriptionRepository, UserRepository userRepository, PlanRepository planRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
        this.planRepository = planRepository;
    }

    @Override
    public SubscriptionDTO create(SubscriptionDTO subscription) throws SubscriptionAlreadyExistsException, SubscriptionDateInvalidException {
        if (!subscription.isValidRangeDate()) {
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
        if (alreadyExists.isPresent()) {
            throw new SubscriptionAlreadyExistsException();
        }
        var sub = SubscriptionDTO.toModel(subscription,
                (userId) -> user,
                (planId) -> this.planRepository.findById(planId).get()
        );
        sub.setStatus(
                SubscriptionStatus.ACTIVE
        );
        return SubscriptionDTO.fromModel(this.subscriptionRepository.save(sub));
    }

    @Override
    public Optional<SubscriptionDTO> findById(Long id) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user.getRole().equals(Roles.ADMIN)) {
            return this.subscriptionRepository
                    .findById(id)
                    .map(SubscriptionDTO::fromModel);
        }
        return this.subscriptionRepository
                .findBySubscriptionIdAndUser(id, user).map(SubscriptionDTO::fromModel);
    }

    @Override
    public List<SubscriptionDTO> findAll(User user) {
        if (user.getRole().equals(Roles.ADMIN)) {
            return this.subscriptionRepository.findAll().stream().map(
                    SubscriptionDTO::fromModel
            ).collect(Collectors.toList());
        }
        return this.subscriptionRepository.findAllByUser(user).stream().map(SubscriptionDTO::fromModel).collect(Collectors.toList());
    }

    @Override
    public boolean cancel(SubscriptionDTO subscriptionDTO, User user) {
        var subscriptionD = this.subscriptionRepository.findBySubscriptionIdAndUser(subscriptionDTO.subscriptionId(), user);
        if (subscriptionD.isEmpty()) {
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
