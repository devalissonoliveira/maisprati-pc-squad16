package com.br.maisprati.squad16.EncontreMeuPet.domain.services.implementation;

import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.PlanDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.repositories.PlanRepository;
import com.br.maisprati.squad16.EncontreMeuPet.domain.services.PlanService;
import jakarta.transaction.Transactional;
import jakarta.validation.ValidationException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
public class PlanServiceImpl implements PlanService {

    private final PlanRepository planRepository;

    public PlanServiceImpl(
            PlanRepository planRepository
    ) {
        this.planRepository = planRepository;
    }

    @Override
    public PlanDTO create(PlanDTO plan) {
        return PlanDTO.fromPlanModel(this.planRepository.save(plan.toModel()));
    }

    @Override
    public List<PlanDTO> allActive(boolean active) {
        return this.planRepository.findAllByActive(active).stream()
                .map(
                        PlanDTO::fromPlanModel
                ).collect(Collectors.toList());
    }

    @Override
    public List<PlanDTO> all() {
        return this.planRepository.findAll().stream().map(PlanDTO::fromPlanModel).collect(Collectors.toList());
    }

    @Override
    public Optional<PlanDTO> findById(Long id) {
        return this.planRepository.findById(id).map(PlanDTO::fromPlanModel);
    }

    @Override
    public boolean update(Long planId, PlanDTO updateDTO) {
        var plan = this.planRepository.findById(planId).orElse(null);
        if (plan.getPlanId() == null) {
            throw new ValidationException("Plan id is null");
        }
        plan.setMaxPets(updateDTO.maxPets());
        plan.setMinPets(updateDTO.minPets());
        plan.setDescription(updateDTO.description());
        plan.setName(updateDTO.name());
        plan.setAnnualPrice(updateDTO.annualPrice());
        plan.setMonthlyPrice(updateDTO.monthlyPrice());
        plan.setActive(updateDTO.active());
        this.planRepository.save(plan);
        return true;
    }

    @Override
    public void deleteById(Long id) {
        this.planRepository.deleteById(id);
    }
}
