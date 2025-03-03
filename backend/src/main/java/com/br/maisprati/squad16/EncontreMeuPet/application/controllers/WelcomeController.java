package com.br.maisprati.squad16.EncontreMeuPet.application.controllers;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin
@RestController
public class WelcomeController {

    @GetMapping("/welcome")
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity<?> greeting() {
        return ResponseEntity.ok(new Object() {
            public final String message = "Welcome";
        });
    }
}
