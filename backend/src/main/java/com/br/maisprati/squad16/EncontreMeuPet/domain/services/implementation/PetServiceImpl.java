package com.br.maisprati.squad16.EncontreMeuPet.domain.services.implementation;

import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.PetDTO;

import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;
import com.br.maisprati.squad16.EncontreMeuPet.domain.repositories.PetRepository;
import com.br.maisprati.squad16.EncontreMeuPet.domain.services.PetService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PetServiceImpl implements PetService {
    private final PetRepository petRepository;

    public PetServiceImpl(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    @Override
    public PetDTO create(PetDTO petDto) {
        var pet = petDto.toModel();
        pet.setUser((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        pet.setActive(true);
        return PetDTO.fromModelToDTO(this.petRepository.save(pet));
    }

    @Override
    public List<PetDTO> allActive(boolean active) {
        return this.petRepository.findAllByActiveAndUser(
                active,
                (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()
        )
                .stream()
                .map(PetDTO::fromModelToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<PetDTO> all() {
        return this.petRepository.findAll().stream().map(PetDTO::fromModelToDTO).collect(Collectors.toList());
    }

    @Override
    public Optional<PetDTO> findById(Long id) {
        var currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(currentUser.isAdmin()){
            return this.petRepository.findById(id)
                    .map(PetDTO::fromModelToDTO);
        }
        return this.petRepository.findByPetIdAndUser(
                id,
                currentUser
        ).map(PetDTO::fromModelToDTO);
    }

    @Override
    public boolean update(Long petId, PetDTO updateDTO) {
        var currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var pet = this.petRepository.findByPetIdAndUser(petId, currentUser);
        if(pet.isEmpty()){
            return false;
        }
        var petU = updateDTO.toModel();
        petU.setPetId(petId);
        petU.setUser(currentUser);
        this.petRepository.save(petU);
        return true;
    }

    @Override
    public void deleteById(Long id) {
        var currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var pet = this.petRepository.findByPetIdAndUser(id, currentUser);
        if(pet.isPresent()){
            this.petRepository.deleteById(id);
        }
    }
}
