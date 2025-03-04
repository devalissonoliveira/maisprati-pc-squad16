package com.br.maisprati.squad16.EncontreMeuPet.domain.services;

import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.QRCodeDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;
import java.util.List;
import java.util.Optional;

public interface QRCodeService {

    QRCodeDTO generateQRCode(Long petId, User user);

    List<QRCodeDTO> getAllQRCodesByUser(User user);

    List<QRCodeDTO> getAllQRCodesByPet(Long petId, User user);

    Optional<QRCodeDTO> getQRCodeById(Long qrCodeId, User user);

    Optional<QRCodeDTO> getQRCodeByHash(String hashCode);

    boolean desactivateQRCode(Long qrCodeId, User user);
}
