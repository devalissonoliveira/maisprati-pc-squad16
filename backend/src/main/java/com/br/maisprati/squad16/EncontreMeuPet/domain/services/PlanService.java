package com.br.maisprati.squad16.EncontreMeuPet.domain.services;

import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.PlanDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.PlanUpdateDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Plan;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


public interface PlanService {
    Plan create(Plan plan);
    List<Plan> allActive(boolean active);
    List<Plan> all();
    Optional<Plan> findById(Long id);
    boolean update(Plan plan, PlanUpdateDTO updateDTO);
    void deleteById(Long id);
}
