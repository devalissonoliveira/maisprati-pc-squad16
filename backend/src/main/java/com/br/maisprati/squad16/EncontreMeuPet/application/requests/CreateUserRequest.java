package com.br.maisprati.squad16.EncontreMeuPet.application.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

public record CreateUserRequest(
        @NotBlank
        @Length(min = 3, max = 100)
        String name,
        @NotBlank
        @Email
        String email,
        @NotBlank
        @Length(min = 6)
        String password,
        @NotBlank
        @Pattern(regexp = "^\\d{10,15}$", message = "Phone number must be between 10 and 15 digits")
        String phone,
        @NotBlank
        String street,
        @NotBlank
        String number,
        @NotBlank
        String neighborhood,
        @NotBlank
        @Pattern(regexp = "^\\d{8}$", message = "CEP must have 8 digits")
        String postalCode,
        @NotBlank
        String city,
        @NotBlank
        @Length(min = 2, max = 2)
        String state) {

}
