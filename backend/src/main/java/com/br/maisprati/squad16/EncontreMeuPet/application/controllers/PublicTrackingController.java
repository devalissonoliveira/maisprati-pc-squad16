package com.br.maisprati.squad16.EncontreMeuPet.application.controllers;

import com.br.maisprati.squad16.EncontreMeuPet.application.requests.ReportPetFoundRequest;
import com.br.maisprati.squad16.EncontreMeuPet.domain.enums.TrackingStatus;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.QrCode;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Tracking;
import com.br.maisprati.squad16.EncontreMeuPet.domain.repositories.QRCodeRepository;
import com.br.maisprati.squad16.EncontreMeuPet.domain.repositories.TrackingRepository;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/public/pet")
public class PublicTrackingController {

    private final QRCodeRepository qrCodeRepository;
    private final TrackingRepository trackingRepository;

    public PublicTrackingController(QRCodeRepository qrCodeRepository, TrackingRepository trackingRepository) {
        this.qrCodeRepository = qrCodeRepository;
        this.trackingRepository = trackingRepository;
    }

    @GetMapping("/find/{hashCode}")
    @Operation(description = "Endpoint público para visualizar informações básicas de um pet perdido")
    public ResponseEntity<?> findPetByQRCode(@PathVariable String hashCode, HttpServletRequest request) {
        return qrCodeRepository.findByHashCodeAndActiveTrue(hashCode)
                .map(qrCode -> {
                    registerScan(qrCode, request);

                    var pet = qrCode.getPet();
                    return ResponseEntity.ok(new Object() {
                        public final String petName = pet.getName();
                        public final String species = pet.getSpecies().toString();
                        public final String breed = pet.getBreed();
                        public final Integer age = pet.getAge();
                        public final String qrCodeHash = qrCode.getHashCode();
                    });
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/found/{hashCode}")
    @Operation(description = "Endpoint público para reportar um pet encontrado")
    public ResponseEntity<?> reportPetFound(
            @PathVariable String hashCode,
            @RequestBody @Valid ReportPetFoundRequest request,
            HttpServletRequest servletRequest) {

        return qrCodeRepository.findByHashCodeAndActiveTrue(hashCode)
                .map(qrCode -> {
                    Tracking tracking = registerScan(qrCode, servletRequest);
                    tracking.setContactInfo(request.contactInfo());
                    tracking.setStatus(TrackingStatus.PENDING);
                    trackingRepository.save(tracking);

                    return ResponseEntity.ok(new Object() {
                        public final String message = "Obrigado por reportar o pet encontrado. O dono será notificado.";
                        public final Long trackingId = tracking.getTrackingId();
                    });
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private Tracking registerScan(QrCode qrCode, HttpServletRequest request) {
        Tracking tracking = new Tracking();
        tracking.setQrCode(qrCode);
        tracking.setScanDate(LocalDateTime.now());
        tracking.setDevice(request.getHeader("User-Agent"));
        tracking.setStatus(TrackingStatus.VIEWED);
        return trackingRepository.save(tracking);
    }
}
