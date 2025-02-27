package com.br.maisprati.squad16.EncontreMeuPet.application.controllers;

import com.br.maisprati.squad16.EncontreMeuPet.application.requests.AddPetToSubscriptionRequest;
import com.br.maisprati.squad16.EncontreMeuPet.application.requests.CancelSubscriptionRequest;
import com.br.maisprati.squad16.EncontreMeuPet.application.requests.CreateSubscriptionRequest;
import com.br.maisprati.squad16.EncontreMeuPet.application.requests.RemovePetFromSubscriptionRequest;
import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.SubscriptionDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.SubscriptionPetDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions.ApplicationException;
import com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions.SubscriptionAlreadyExistsException;
import com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions.SubscriptionDateInvalidException;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.SubscriptionPet;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;
import com.br.maisprati.squad16.EncontreMeuPet.domain.services.PetService;
import com.br.maisprati.squad16.EncontreMeuPet.domain.services.SubscriptionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/subscriptions")
@SecurityRequirement(name = "Bearer Authentication")
public class SubscriptionController {
    private final SubscriptionService subscriptionService;
    private final PetService petService;

    public SubscriptionController(SubscriptionService subscriptionService, PetService petService) {
        this.subscriptionService = subscriptionService;
        this.petService = petService;
    }

    @PostMapping
    @Operation(
            description = "Create a subscription"
    )
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<SubscriptionDTO> create(
            @RequestBody @Valid CreateSubscriptionRequest subscriptionDTO
    ) throws ApplicationException, SubscriptionDateInvalidException {
        var sub = this.subscriptionService.create(
                CreateSubscriptionRequest.toDTO(
                        subscriptionDTO,
                        (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(sub);
    }

    @PostMapping("/{id}")
    @Operation(
            description = "Add pet to a existing subscription"
    )
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<SubscriptionPetDTO>> addPet(
            @PathVariable Long id,
            @RequestBody @Valid AddPetToSubscriptionRequest addPetToSubscriptionRequest
    ) throws ApplicationException {
        var subscription = this.subscriptionService.findById(id).orElseThrow(() -> new ApplicationException("Plano não encontrado", HttpStatus.NOT_FOUND));
        return ResponseEntity.ok(this.subscriptionService.addPets(
                subscription,
                addPetToSubscriptionRequest.petIds(),
                (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()
        ));
    }

    @PatchMapping("/{id}/remove")
    @Operation(
            description = "Remove pet to a existing subscription"
    )
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> removePet(
            @PathVariable Long id,
            @RequestBody @Valid RemovePetFromSubscriptionRequest addPetToSubscriptionRequest
    ) throws ApplicationException {
        var subscription = this.subscriptionService.findById(id)
                .orElseThrow(() -> new ApplicationException("Plano não encontrado", HttpStatus.NOT_FOUND));
        var pet = this.petService.findById(addPetToSubscriptionRequest.petId())
                .orElseThrow(() -> new ApplicationException("Animal não encontrado", HttpStatus.NOT_FOUND));
        this.subscriptionService.removePetFromSubscription(
                subscription,
                pet,
                (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()
        );
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @ApiResponse(description = "All subscriptions associated to the user")
    public ResponseEntity<List<SubscriptionDTO>> getAll() {
        return ResponseEntity.ok(this.subscriptionService.findAll(
                (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()
        ));
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(
            description = "Cancel a subscription"
    )
    public ResponseEntity<?> cancel(
            @PathVariable Long id,
            @RequestBody @Valid CancelSubscriptionRequest request
    ) {

        this.subscriptionService.cancel(
                CancelSubscriptionRequest.toDTO(request, id),
                (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()
        );
        return ResponseEntity.noContent().build();
    }
}
