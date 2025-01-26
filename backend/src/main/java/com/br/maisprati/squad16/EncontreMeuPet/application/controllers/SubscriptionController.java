package com.br.maisprati.squad16.EncontreMeuPet.application.controllers;

import com.br.maisprati.squad16.EncontreMeuPet.application.requests.CreateSubscriptionRequest;
import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.SubscriptionDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions.ApplicationException;
import com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions.SubscriptionAlreadyExistsException;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;
import com.br.maisprati.squad16.EncontreMeuPet.domain.services.SubscriptionService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<SubscriptionDTO> create(
            @RequestBody @Valid CreateSubscriptionRequest subscriptionDTO
    ) throws SubscriptionAlreadyExistsException {
        var sub = this.subscriptionService.create(
                CreateSubscriptionRequest.toDTO(
                        subscriptionDTO,
                        (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(sub);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @ApiResponse(description = "Get all subscriptions")
    public ResponseEntity<List<SubscriptionDTO>> getAll() {
        return ResponseEntity.ok(this.subscriptionService.findAll(
                (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()
        ));
    }
}
