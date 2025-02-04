package com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions;

import org.springframework.http.HttpStatus;

public class ApplicationException extends Exception
{
    private final HttpStatus status;
    public HttpStatus getStatus()
    {
        return status;
    }
    public ApplicationException(String message){
        super(message);
        this.status = HttpStatus.UNPROCESSABLE_ENTITY;
    }
    public ApplicationException(String message, HttpStatus status)
    {
        super(message);
        this.status = status;
    }
    public Object toResponse()
    {
        var that = this;
        return new Object() {
            public final String message = that.getMessage();
        };
    }
}
