package com.br.maisprati.squad16.EncontreMeuPet.application.controllers;

import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.CreateQRCodeDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.QRCodeDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;
import com.br.maisprati.squad16.EncontreMeuPet.domain.services.QRCodeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/qrcodes")
@SecurityRequirement(name = "Bearer Authentication")
public class QRCodeController {

    private final QRCodeService qrCodeService;

    public QRCodeController(QRCodeService qrCodeService) {
        this.qrCodeService = qrCodeService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(description = "Gerar um novo QR Code para um pet")
    public ResponseEntity<QRCodeDTO> generateQRCode(@RequestBody @Valid CreateQRCodeDTO request) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        QRCodeDTO qrCode = qrCodeService.generateQRCode(request.petId(), user);
        return ResponseEntity.status(HttpStatus.CREATED).body(qrCode);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @Operation(description = "Listar todos os QR Codes do usuário")
    public ResponseEntity<List<QRCodeDTO>> getAllQRCodes() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<QRCodeDTO> qrCodes = qrCodeService.getAllQRCodesByUser(user);
        return ResponseEntity.ok(qrCodes);
    }

    @GetMapping("/pet/{petId}")
    @ResponseStatus(HttpStatus.OK)
    @Operation(description = "Listar todos os QR Codes de um pet específico")
    public ResponseEntity<List<QRCodeDTO>> getQRCodesByPet(@PathVariable Long petId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<QRCodeDTO> qrCodes = qrCodeService.getAllQRCodesByPet(petId, user);
        return ResponseEntity.ok(qrCodes);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @Operation(description = "Obter um QR Code específico por ID")
    public ResponseEntity<QRCodeDTO> getQRCodeById(@PathVariable Long id) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return qrCodeService.getQRCodeById(id, user)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(description = "Desativar um QR Code específico")
    public ResponseEntity<?> desactivateQRCode(@PathVariable Long id) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean result = qrCodeService.desactivateQRCode(id, user);
        if (result) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/public/{hashCode}")
    @Operation(description = "Endpoint público para acessar informações via QR Code")
    public ResponseEntity<?> accessQRCode(@PathVariable String hashCode) {
        return qrCodeService.getQRCodeByHash(hashCode)
                .map(qrCode -> ResponseEntity.ok(new Object() {
            public final Long qrCodeId = qrCode.qrCodeId();
            public final Long petId = qrCode.petId();
            public final String hash = qrCode.hashCodes();
        }))
                .orElse(ResponseEntity.notFound().build());
    }
}
