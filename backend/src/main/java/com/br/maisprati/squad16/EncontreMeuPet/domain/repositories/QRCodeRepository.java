package com.br.maisprati.squad16.EncontreMeuPet.domain.repositories;

import org.springframework.stereotype.Repository;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Pet;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.QrCode;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

@Repository
public interface QRCodeRepository extends JpaRepository<QrCode, Long> {

    List<QrCode> findByPetAndActiveTrue(Pet pet);

    Optional<QrCode> findByQrCodeIdAndPet_UserAndActiveTrue(Long qrCodeId, User user);

    Optional<QrCode> findByHashCodeAndActiveTrue(String hashCode);

    @Query("SELECT q FROM QrCode q WHERE q.pet.user = :user AND q.active = true")
    List<QrCode> findAllActiveByUser(@Param("user") User user);

    @Query("SELECT q FROM QrCode q JOIN q.pet p WHERE p.petId = :petId AND p.user = :user AND q.active = true")
    List<QrCode> findAllActiveByPetAndUser(@Param("petId") Long petId, @Param("user") User user);
}
