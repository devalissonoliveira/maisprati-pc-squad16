package com.br.maisprati.squad16.EncontreMeuPet.domain.exceptions;

import java.time.LocalDate;

public class SubscriptionDateInvalidException extends ApplicationException {
    private LocalDate startDate;
    private LocalDate endDate;

    public SubscriptionDateInvalidException(String message, LocalDate startDate, LocalDate endDate) {
        super(message);
        this.startDate = startDate;
        this.endDate = endDate;
    }
    public SubscriptionDateInvalidException(LocalDate startDate, LocalDate endDate) {
        super("Data de inscrição inválida");
        this.startDate = startDate;
        this.endDate = endDate;
    }
    @Override
    public Object toResponse() {
        var that = this;
        return new Object(){
            public String message = that.getMessage();
            public String startDate = that.startDate.toString();
            public String endDate = that.endDate.toString();
        };
    }
}
