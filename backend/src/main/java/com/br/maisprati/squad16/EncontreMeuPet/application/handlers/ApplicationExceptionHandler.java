package com.br.maisprati.squad16.EncontreMeuPet.application.handlers;

import com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions.ApplicationException;
import jakarta.persistence.PersistenceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.format.DateTimeParseException;

@ControllerAdvice
public class ApplicationExceptionHandler {
    @ExceptionHandler(ApplicationException.class)
    public ResponseEntity<?> applicationException(ApplicationException e) {
        return ResponseEntity.status(e.getStatus())
                .body(e.toResponse());
    }
    @ExceptionHandler(DateTimeParseException.class)
    public ResponseEntity<?> datetimeFormatException(DateTimeParseException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        new Object(){
                            public final String message = "Data com formato inválido";
                            public final String date = e.getParsedString();
                            public final String suggestedDateFormatDateTime = "yyyy-MM-dd'T'HH:mm:ss.SSSXX";
                            public final String suggestedDateFormatDate = "yyyy-MM-dd";
                            public final String suggestedTimeFormatDate = "HH:mm:ss.SSSXX";
                        }
                );
    }

}
