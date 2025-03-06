package com.br.maisprati.squad16.EncontreMeuPet.application.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record ReportPetFoundRequest(
        @NotBlank
        @Size(min = 5, max = 500, message = "As informações de contato devem ter entre 5 e 500 caracteres")
        String contactInfo,
        BigDecimal latitude,
        BigDecimal longitude) {

}
