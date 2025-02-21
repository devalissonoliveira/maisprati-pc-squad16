package com.br.maisprati.squad16.EncontreMeuPet.application.controllers;

import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.CreatePetDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.PetDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.UpdatePetDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Pet;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;
import com.br.maisprati.squad16.EncontreMeuPet.domain.repositories.PetRepository;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pets")
@SecurityRequirement(name = "Bearer Authentication")
public class PetController {

    private final PetRepository petRepository;

    public PetController(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<PetDTO> createPet(@RequestBody @Valid CreatePetDTO request) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Pet pet = new Pet();
        pet.setName(request.name());
        pet.setSpecies(request.species());
        pet.setBreed(request.breed());
        pet.setAge(request.age());
        pet.setObservations(request.observations());
        pet.setUser(user);
        pet.setActive(true);
        pet.setRegistrationDate(LocalDateTime.now());

        Pet savedPet = petRepository.save(pet);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedPet));
    }

    @GetMapping
    public ResponseEntity<List<PetDTO>> getAllPets() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<PetDTO> pets = petRepository.findAllByUserAndActiveTrue(user)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(pets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetDTO> getPetById(@PathVariable Long id) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return petRepository.findByPetIdAndUserAndActiveTrue(id, user)
                .map(this::convertToDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetDTO> updatePet(
            @PathVariable Long id,
            @RequestBody @Valid UpdatePetDTO request) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Optional<Pet> petOptional = petRepository.findByPetIdAndUserAndActiveTrue(id, user);
        if (petOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Pet pet = petOptional.get();
        pet.setName(request.name());
        pet.setBreed(request.breed());
        pet.setAge(request.age());
        pet.setObservations(request.observations());

        Pet updatedPet = petRepository.save(pet);
        return ResponseEntity.ok(convertToDTO(updatedPet));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> deletePet(@PathVariable Long id) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Optional<Pet> petOptional = petRepository.findByPetIdAndUserAndActiveTrue(id, user);
        if (petOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Pet pet = petOptional.get();
        pet.setActive(false);
        petRepository.save(pet);
        return ResponseEntity.noContent().build();
    }

    private PetDTO convertToDTO(Pet pet) {
        return new PetDTO(
                pet.getPetId(),
                pet.getName(),
                pet.getSpecies(),
                pet.getBreed(),
                pet.getAge(),
                pet.getObservations(),
                pet.getRegistrationDate(),
                pet.isActive()
        );
    }
}
