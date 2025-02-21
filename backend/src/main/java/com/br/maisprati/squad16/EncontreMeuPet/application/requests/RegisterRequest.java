package com.br.maisprati.squad16.EncontreMeuPet.application.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

public record RegisterRequest(
        @NotBlank
        String name,
        @NotBlank
        @Email
        String email,
        @NotBlank
        @Length(min = 6)
        String password) {

}
