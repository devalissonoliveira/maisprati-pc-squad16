package com.br.maisprati.squad16.EncontreMeuPet.domain.dtos;

import com.br.maisprati.squad16.EncontreMeuPet.domain.enums.TrackingStatus;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Tracking;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record TrackingDTO(
        Long trackingId,
        Long qrCodeId,
        Long petId,
        String petName,
        LocalDateTime scanDate,
        BigDecimal latitude,
        BigDecimal longitude,
        String device,
        String contactInfo,
        TrackingStatus status) {

    public static TrackingDTO fromModel(Tracking tracking) {
        return new TrackingDTO(
                tracking.getTrackingId(),
                tracking.getQrCode().getQrCodeId(),
                tracking.getQrCode().getPet().getPetId(),
                tracking.getQrCode().getPet().getName(),
                tracking.getScanDate(),
                tracking.getLatitude(),
                tracking.getLongitude(),
                tracking.getDevice(),
                tracking.getContactInfo(),
                tracking.getStatus()
        );
    }
}
