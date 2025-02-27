package com.br.maisprati.squad16.EncontreMeuPet.domain.dtos;

import com.br.maisprati.squad16.EncontreMeuPet.domain.enums.PetSpecies;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Pet;

import java.time.LocalDateTime;

public record PetDTO(
        Long petId,
        String name,
        PetSpecies species,
        String breed,
        Integer age,
        boolean hasPedigree,
        String pedigreeFile,
        String observations,
        LocalDateTime registrationDate,
        boolean active,
        Long userId
) {
    public static PetDTO toDTO(Pet pet)
    {
        return new PetDTO(
                pet.getPetId(),
                pet.getName(),
                pet.getSpecies(),
                pet.getBreed(),
                pet.getAge(),
                pet.isHasPedigree(),
                pet.getPedigreeFile(),
                pet.getObservations(),
                pet.getRegistrationDate(),
                pet.isActive(),
                pet.getUser().getUserId()
                );
    }
    public Pet toModel() {
        return PetDTO.toModel(this);
    }
    public static Pet toModel(PetDTO petDTO)
    {
        var pet = new Pet();
        pet.setPetId(petDTO.petId());
        pet.setAge(petDTO.age());
        pet.setBreed(petDTO.breed());
        pet.setName(petDTO.name());
        pet.setSpecies(petDTO.species());
        pet.setActive(pet.isActive());
        pet.setPedigreeFile(petDTO.pedigreeFile());
        pet.setHasPedigree(pet.isHasPedigree());
        pet.setRegistrationDate(petDTO.registrationDate());
        pet.setObservations(petDTO.observations());
        return pet;
    }



}