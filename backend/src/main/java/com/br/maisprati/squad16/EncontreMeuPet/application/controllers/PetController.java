package com.br.maisprati.squad16.EncontreMeuPet.application.controllers;

import com.br.maisprati.squad16.EncontreMeuPet.application.controllers.query.ActiveQuery;
import com.br.maisprati.squad16.EncontreMeuPet.application.requests.CreatePetRequest;
import com.br.maisprati.squad16.EncontreMeuPet.application.requests.UpdatePetRequest;
import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.PetDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions.ApplicationException;
import com.br.maisprati.squad16.EncontreMeuPet.domain.services.PetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pets")
@SecurityRequirement(name = "Bearer Authentication")
public class PetController {
    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @PostMapping
    @Operation(
            description = "Create a Pet"
    )
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<PetDTO> create(@RequestBody @Valid CreatePetRequest petRequest) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        this.petService.create(petRequest.toDTO())
                );
    }
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<PetDTO>> getAll(
            @RequestParam Optional<ActiveQuery> active
    ) {
        var e = active.orElse(ActiveQuery.BOTH);
        if (e.equals(ActiveQuery.BOTH)) {
            return ResponseEntity.ok(
                    this.petService.all()
            );
        }
        return ResponseEntity.ok(
                this.petService.allActive(e.equals(ActiveQuery.ACTIVE))
        );
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
            description = "Update a Pet"
    )
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> update(
            @PathVariable("id") Long id,
            @RequestBody @Valid UpdatePetRequest updatePetRequest
    ) throws ApplicationException {
        var plan = this.petService.findById(id);
        if (plan.isEmpty()) {
            throw new ApplicationException("Pet não encontrado", HttpStatus.NOT_FOUND);
        }
        petService.update(
                id,
                updatePetRequest.toDTO()
        );
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<PetDTO> findById(
            @PathVariable Long id
    )  throws ApplicationException  {
        var pet = this.petService.findById(id);
        return pet
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ApplicationException("Pet não encontrado", HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(
            description = "Delete a Pet"
    )
    public ResponseEntity<?> deleteById(
            @PathVariable Long id
    ) {
        this.petService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
