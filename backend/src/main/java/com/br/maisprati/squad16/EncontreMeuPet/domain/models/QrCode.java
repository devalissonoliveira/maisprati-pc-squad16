package com.br.maisprati.squad16.EncontreMeuPet.domain.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "qr_codes")
public class QrCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "qr_code_id")
    private Long qrCodeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @Column(name = "hash_code", length = 64, nullable = false, unique = true)
    private String hashCode;

    @Column(name = "generation_date")
    private LocalDateTime generationDate;

    @Column(name = "active")
    private boolean active;

    public QrCode() {
    }

    public Long getQrCodeId() {
        return qrCodeId;
    }

    public void setQrCodeId(Long qrCodeId) {
        this.qrCodeId = qrCodeId;
    }

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }

    public String getHashCode() {
        return hashCode;
    }

    public void setHashCode(String hashCode) {
        this.hashCode = hashCode;
    }

    public LocalDateTime getGenerationDate() {
        return generationDate;
    }

    public void setGenerationDate(LocalDateTime generationDate) {
        this.generationDate = generationDate;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        QrCode qrCode = (QrCode) o;

        return qrCodeId != null ? qrCodeId.equals(qrCode.qrCodeId) : qrCode.qrCodeId == null;
    }

    @Override
    public int hashCode() {
        return qrCodeId != null ? qrCodeId.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "QrCode{"
                + "qrCodeId=" + qrCodeId
                + ", pet=" + pet.getName()
                + ", hashCode='" + hashCode + '\''
                + ", generationDate=" + generationDate
                + ", active=" + active
                + '}';
    }
}
