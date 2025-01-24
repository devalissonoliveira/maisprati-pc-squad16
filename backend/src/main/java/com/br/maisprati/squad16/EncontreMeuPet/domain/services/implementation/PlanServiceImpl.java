package com.br.maisprati.squad16.EncontreMeuPet.domain.services.implementation;

import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.PlanDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.PlanUpdateDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Plan;
import com.br.maisprati.squad16.EncontreMeuPet.domain.repositories.PlanRepository;
import com.br.maisprati.squad16.EncontreMeuPet.domain.services.PlanService;
import jakarta.validation.ValidationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlanServiceImpl implements PlanService {
    private final PlanRepository planRepository;

    public PlanServiceImpl(
            PlanRepository planRepository
    ) {
        this.planRepository = planRepository;
    }

    @Override
    public Plan create(Plan plan) {
        return this.planRepository.save(plan);
    }

    @Override
    public List<Plan> allActive(boolean active) {
        return this.planRepository.findAllByActive(active);
    }

    @Override
    public List<Plan> all() {
        return this.planRepository.findAll();
    }

    @Override
    public Optional<Plan> findById(Long id) {
       return  this.planRepository.findById(id);
    }

    @Override
    public boolean update(Plan plan, PlanUpdateDTO updateDTO) {
        if(plan.getPlanId() == null){
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
