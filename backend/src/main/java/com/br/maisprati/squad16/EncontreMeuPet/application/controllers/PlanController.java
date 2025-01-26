package com.br.maisprati.squad16.EncontreMeuPet.application.controllers;

import com.br.maisprati.squad16.EncontreMeuPet.application.controllers.query.ActiveQuery;
import com.br.maisprati.squad16.EncontreMeuPet.application.requests.CreatePlanRequest;
import com.br.maisprati.squad16.EncontreMeuPet.application.requests.UpdatePlanRequest;
import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.PlanDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.services.PlanService;
import io.swagger.v3.oas.annotations.Operation;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/plans")
@SecurityRequirement(name = "Bearer Authentication")
public class PlanController {
    private final PlanService planService;

    public PlanController(
            PlanService planService
    ) {
        this.planService = planService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
            description = "Create a Plan"
    )
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<PlanDTO> create(
            @RequestBody @Valid CreatePlanRequest createPlanRequest
    ) {
        var plan = planService.create(
                createPlanRequest.toDTO()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(plan);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
            description = "Update a Plan"
    )
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> update(
            @PathVariable("id") Long id,
            @RequestBody @Valid UpdatePlanRequest updatePlanRequest
    ) {
        var plan = this.planService.findById(id);
        if (plan.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        planService.update(
                id,
                updatePlanRequest.toDTO()
        );
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<PlanDTO>> getAll(
            @RequestParam Optional<ActiveQuery> active
    ) {
        var e = active.orElse(ActiveQuery.BOTH);
        if (e.equals(ActiveQuery.BOTH)) {
            return ResponseEntity.ok(
                    this.planService.all()

            );
        }

        return ResponseEntity.ok(
                this.planService.allActive(e.equals(ActiveQuery.ACTIVE))

        );
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<PlanDTO> findById(
            @PathVariable Long id
    ) {
        var plan = this.planService.findById(id);
        return plan
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound()
                        .build());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(
            description = "Delete a Plan"
    )
    public ResponseEntity<?> deleteById(
            @PathVariable Long id
    ) {
        this.planService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
