package com.br.maisprati.squad16.EncontreMeuPet.application.handlers;

import io.swagger.v3.core.util.Json;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;
import java.io.IOException;

@Component
public class AccessDeniedHandler implements org.springframework.security.web.access.AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        var j = Json.pretty().writeValueAsString(new Object() {
            public int statusCode = HttpServletResponse.SC_FORBIDDEN;
            public String path = request.getContextPath();
            public String message = accessDeniedException.getLocalizedMessage();
            public String cause = "FORBIDDEN";
        });
        System.out.println(j);
        response.getWriter().write(j);
        accessDeniedException.printStackTrace();
    }
}
