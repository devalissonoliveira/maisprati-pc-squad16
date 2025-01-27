package com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions;

public class SubscriptionAlreadyExistsException extends ApplicationException{
    public SubscriptionAlreadyExistsException()
    {
        super("Já possui inscrição");
    }
    public SubscriptionAlreadyExistsException(String message) {
        super(message);
    }
}
