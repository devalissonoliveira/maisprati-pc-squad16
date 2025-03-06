package com.br.maisprati.squad16.EncontreMeuPet.domain.repositories;

import org.springframework.stereotype.Repository;
import com.br.maisprati.squad16.EncontreMeuPet.domain.enums.TrackingStatus;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.QrCode;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Tracking;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface TrackingRepository extends JpaRepository<Tracking, Long> {

    List<Tracking> findByQrCode(QrCode qrCode);

    List<Tracking> findByQrCodeAndStatus(QrCode qrCode, TrackingStatus status);

    @Query("SELECT t FROM Tracking t JOIN t.qrCode q JOIN q.pet p WHERE p.user = :user ORDER BY t.scanDate DESC")
    List<Tracking> findAllByUser(@Param("user") User user);

    @Query("SELECT t FROM Tracking t JOIN t.qrCode q JOIN q.pet p WHERE p.petId = :petId AND p.user = :user ORDER BY t.scanDate DESC")
    List<Tracking> findAllByPetAndUser(@Param("petId") Long petId, @Param("user") User user);

    @Query("SELECT t FROM Tracking t JOIN t.qrCode q JOIN q.pet p WHERE p.user = :user AND t.status = :status ORDER BY t.scanDate DESC")
    List<Tracking> findAllByUserAndStatus(@Param("user") User user, @Param("status") TrackingStatus status);
}
