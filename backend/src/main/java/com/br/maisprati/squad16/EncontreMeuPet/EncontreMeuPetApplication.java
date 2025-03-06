package com.br.maisprati.squad16.EncontreMeuPet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Locale;

@SpringBootApplication
public class EncontreMeuPetApplication {

    public static void main(String[] args) {
        SpringApplication.run(EncontreMeuPetApplication.class, args);
    }

}
