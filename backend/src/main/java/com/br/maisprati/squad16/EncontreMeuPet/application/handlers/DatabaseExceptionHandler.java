package com.br.maisprati.squad16.EncontreMeuPet.application.handlers;

import jakarta.persistence.PersistenceException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.SQLException;

@ControllerAdvice
public class DatabaseExceptionHandler {

    @ExceptionHandler(PersistenceException.class)
    public ResponseEntity<?> handlePersistenceException(PersistenceException e) {
        var str = new StringWriter();
        var p = new PrintWriter(str);
        e.printStackTrace(p);
        e.printStackTrace();
        return ResponseEntity.internalServerError().body(new Object() {
            public int statusCode = 500;
            public String message = e.getMessage();
            public String statckTrace = str.toString();
        });
    }

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<?> handleSQLException(SQLException e) {
        var str = new StringWriter();
        var p = new PrintWriter(str);
        e.printStackTrace(p);
        e.printStackTrace();
        return ResponseEntity.internalServerError().body(new Object() {
            public int statusCode = 500;
            public String message = e.getMessage();
            public String statckTrace = str.toString();
        });
    }
}
