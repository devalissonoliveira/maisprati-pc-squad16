package com.br.maisprati.squad16.LanceNoTempo.application.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank
        @Email
        String email,
        @NotBlank
        String password
) {
}
