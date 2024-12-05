package com.br.maisprati.squad16.LanceNoTempo.application.handlers;

import io.swagger.v3.core.util.Json;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;


import java.io.IOException;

@Component
public class JWTAuthenticationEntryPoint implements AuthenticationEntryPoint {


    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        var j = Json.pretty().writeValueAsString(new Object(){
            public  int statusCode = HttpServletResponse.SC_UNAUTHORIZED;
            public String path = request.getServletPath();
            public String message = authException.getLocalizedMessage();
            public String cause = "UNAUTHORIZED";
        });
        response.getWriter().write(j);
        System.out.println("Caiu no entrypoint");
        authException.printStackTrace();
    }
}