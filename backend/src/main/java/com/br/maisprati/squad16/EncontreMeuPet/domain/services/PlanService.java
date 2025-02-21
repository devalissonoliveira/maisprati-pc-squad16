package com.br.maisprati.squad16.EncontreMeuPet.domain.services;

import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.PlanDTO;
import java.util.List;
import java.util.Optional;

public interface PlanService {

    PlanDTO create(PlanDTO plan);

    List<PlanDTO> allActive(boolean active);

    List<PlanDTO> all();

    Optional<PlanDTO> findById(Long id);

    boolean update(Long planId, PlanDTO updateDTO);

    void deleteById(Long id);
}
