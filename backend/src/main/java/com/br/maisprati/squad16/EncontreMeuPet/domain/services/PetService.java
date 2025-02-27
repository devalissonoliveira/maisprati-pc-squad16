package com.br.maisprati.squad16.EncontreMeuPet.domain.services;

import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.PetDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.PlanDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions.ApplicationException;

import java.util.List;
import java.util.Optional;

public interface PetService {
    PetDTO create(PetDTO plan);
    List<PetDTO> allActive(boolean active);
    List<PetDTO> all();
    Optional<PetDTO> findById(Long id);
    boolean update(Long planId, PetDTO updateDTO);
    void deleteById(Long id) throws ApplicationException;
}
