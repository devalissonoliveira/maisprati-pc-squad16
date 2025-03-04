package com.br.maisprati.squad16.EncontreMeuPet.application.controllers;

import com.br.maisprati.squad16.EncontreMeuPet.domain.enums.TrackingStatus;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Tracking;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;
import com.br.maisprati.squad16.EncontreMeuPet.domain.repositories.TrackingRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.TrackingDTO;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/trackings")
@SecurityRequirement(name = "Bearer Authentication")
public class TrackingController {

    private final TrackingRepository trackingRepository;

    public TrackingController(TrackingRepository trackingRepository) {
        this.trackingRepository = trackingRepository;
    }

    @GetMapping
    @Operation(description = "Listar todos os rastreamentos do usuário")
    public ResponseEntity<List<TrackingDTO>> getAllTrackings() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<TrackingDTO> trackings = trackingRepository.findAllByUser(user)
                .stream()
                .map(TrackingDTO::fromModel)
                .collect(Collectors.toList());
        return ResponseEntity.ok(trackings);
    }

    @GetMapping("/pet/{petId}")
    @Operation(description = "Listar todos os rastreamentos de um pet específico")
    public ResponseEntity<List<TrackingDTO>> getTrackingsByPet(@PathVariable Long petId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<TrackingDTO> trackings = trackingRepository.findAllByPetAndUser(petId, user)
                .stream()
                .map(TrackingDTO::fromModel)
                .collect(Collectors.toList());
        return ResponseEntity.ok(trackings);
    }

    @GetMapping("/pending")
    @Operation(description = "Listar todos os rastreamentos pendentes (reportes de pets encontrados)")
    public ResponseEntity<List<TrackingDTO>> getPendingTrackings() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<TrackingDTO> trackings = trackingRepository.findAllByUserAndStatus(user, TrackingStatus.PENDING)
                .stream()
                .map(TrackingDTO::fromModel)
                .collect(Collectors.toList());
        return ResponseEntity.ok(trackings);
    }

    @GetMapping("/{id}")
    @Operation(description = "Obter detalhes de um rastreamento específico")
    public ResponseEntity<TrackingDTO> getTrackingById(@PathVariable Long id) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<Tracking> tracking = trackingRepository.findById(id);

        if (tracking.isPresent() && tracking.get().getQrCode().getPet().getUser().equals(user)) {
            return ResponseEntity.ok(TrackingDTO.fromModel(tracking.get()));
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/resolve")
    @Operation(description = "Marcar um rastreamento pendente como resolvido")
    public ResponseEntity<?> resolveTracking(@PathVariable Long id) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<Tracking> trackingOptional = trackingRepository.findById(id);

        if (trackingOptional.isPresent()) {
            Tracking tracking = trackingOptional.get();
            if (tracking.getQrCode().getPet().getUser().equals(user) && tracking.getStatus() == TrackingStatus.PENDING) {
                tracking.setStatus(TrackingStatus.RESOLVED);
                trackingRepository.save(tracking);
                return ResponseEntity.ok(new Object() {
                    public final String message = "Rastreamento marcado como resolvido";
                    public final LocalDateTime resolvedAt = LocalDateTime.now();
                });
            }
        }
        return ResponseEntity.notFound().build();
    }
}
