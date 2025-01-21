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
@Table(name = "password_recovery")
public class PasswordRecovery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recovery_id")
    private Long recoveryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "token", length = 64, nullable = false, unique = true)
    private String token;

    @Column(name = "generation_date")
    private LocalDateTime generationDate;

    @Column(name = "expiration_date", nullable = false)
    private LocalDateTime expirationDate;

    @Column(name = "used")
    private boolean used;

    public PasswordRecovery() {
    }

    public Long getRecoveryId() {
        return recoveryId;
    }

    public void setRecoveryId(Long recoveryId) {
        this.recoveryId = recoveryId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getGenerationDate() {
        return generationDate;
    }

    public void setGenerationDate(LocalDateTime generationDate) {
        this.generationDate = generationDate;
    }

    public LocalDateTime getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }

    public boolean isUsed() {
        return used;
    }

    public void setUsed(boolean used) {
        this.used = used;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PasswordRecovery that = (PasswordRecovery) o;

        return recoveryId != null ? recoveryId.equals(that.recoveryId) : that.recoveryId == null;
    }

    @Override
    public int hashCode() {
        return recoveryId != null ? recoveryId.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "PasswordRecovery{"
                + "recoveryId=" + recoveryId
                + ", user=" + user.getName()
                + ", token='" + token + '\''
                + ", generationDate=" + generationDate
                + ", expirationDate=" + expirationDate
                + ", used=" + used
                + '}';
    }
}
