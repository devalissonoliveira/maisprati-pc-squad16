package com.br.maisprati.squad16.EncontreMeuPet.domain.services;

import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.QRCodeDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Pet;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.QrCode;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;
import com.br.maisprati.squad16.EncontreMeuPet.domain.repositories.PetRepository;
import com.br.maisprati.squad16.EncontreMeuPet.domain.repositories.QRCodeRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class QRCodeServiceImpl implements QRCodeService {

    private final QRCodeRepository qrCodeRepository;
    private final PetRepository petRepository;

    public QRCodeServiceImpl(QRCodeRepository qrCodeRepository, PetRepository petRepository) {
        this.qrCodeRepository = qrCodeRepository;
        this.petRepository = petRepository;
    }

    @Override
    public QRCodeDTO generateQRCode(Long petId, User user) {
        Optional<Pet> petOptional = petRepository.findByPetIdAndUserAndActiveTrue(petId, user);
        if (petOptional.isEmpty()) {
            throw new IllegalArgumentException("Pet não encontrado ou não pertence ao usuário");
        }

        Pet pet = petOptional.get();

        String hashCode = generateUniqueHash();

        QrCode qrCode = new QrCode();
        qrCode.setPet(pet);
        qrCode.setHashCode(hashCode);
        qrCode.setGenerationDate(LocalDateTime.now());
        qrCode.setActive(true);

        QrCode savedQrCode = qrCodeRepository.save(qrCode);
        return QRCodeDTO.fromModel(savedQrCode);
    }

    @Override
    public List<QRCodeDTO> getAllQRCodesByUser(User user) {
        return qrCodeRepository.findAllActiveByUser(user)
                .stream()
                .map(QRCodeDTO::fromModel)
                .collect(Collectors.toList());
    }

    @Override
    public List<QRCodeDTO> getAllQRCodesByPet(Long petId, User user) {
        return qrCodeRepository.findAllActiveByPetAndUser(petId, user)
                .stream()
                .map(QRCodeDTO::fromModel)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<QRCodeDTO> getQRCodeById(Long qrCodeId, User user) {
        return qrCodeRepository.findByQrCodeIdAndPet_UserAndActiveTrue(qrCodeId, user)
                .map(QRCodeDTO::fromModel);
    }

    @Override
    public Optional<QRCodeDTO> getQRCodeByHash(String hashCode) {
        return qrCodeRepository.findByHashCodeAndActiveTrue(hashCode)
                .map(QRCodeDTO::fromModel);
    }

    @Override
    public boolean desactivateQRCode(Long qrCodeId, User user) {
        Optional<QrCode> qrCodeOptional = qrCodeRepository.findByQrCodeIdAndPet_UserAndActiveTrue(qrCodeId, user);
        if (qrCodeOptional.isEmpty()) {
            return false;
        }

        QrCode qrCode = qrCodeOptional.get();
        qrCode.setActive(false);
        qrCodeRepository.save(qrCode);
        return true;
    }

    private String generateUniqueHash() {
        String hash = UUID.randomUUID().toString().replace("-", "");

        while (qrCodeRepository.findByHashCodeAndActiveTrue(hash).isPresent()) {
            hash = UUID.randomUUID().toString().replace("-", "");
        }

        return hash;
    }
}
