package com.br.maisprati.squad16.EncontreMeuPet.application.handlers;

import com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions.ApplicationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApplicationExceptionHandler {

    @ExceptionHandler(ApplicationException.class)
    public ResponseEntity<?> applicationException(ApplicationException e) {
        return ResponseEntity.status(e.getStatus())
                .body(e.toResponse());
    }
}
