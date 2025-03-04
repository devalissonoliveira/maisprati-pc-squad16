package com.br.maisprati.squad16.EncontreMeuPet.domain.dtos;

import com.br.maisprati.squad16.EncontreMeuPet.domain.models.QrCode;
import java.time.LocalDateTime;

public record QRCodeDTO(
        Long qrCodeId,
        Long petId,
        String hashCodes,
        LocalDateTime generationDate,
        boolean active) {

    public static QRCodeDTO fromModel(QrCode qrCode) {
        return new QRCodeDTO(
                qrCode.getQrCodeId(),
                qrCode.getPet().getPetId(),
                qrCode.getHashCode(),
                qrCode.getGenerationDate(),
                qrCode.isActive()
        );
    }
}
