package com.br.maisprati.squad16.EncontreMeuPet.application.seeders;

import com.br.maisprati.squad16.EncontreMeuPet.domain.enums.Roles;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;
import com.br.maisprati.squad16.EncontreMeuPet.domain.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserSeeder implements CommandLineRunner {

    @Value("${spring.security.user.email}")
    private String adminEmail;
    @Value("${spring.security.user.password}")
    private String adminPassword;

    private final PasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;

    public UserSeeder(PasswordEncoder bCryptPasswordEncoder, UserRepository userRepository) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (this.adminEmail == null) {
            return;
        }
        if (this.adminPassword == null) {
            return;
        }
        if (this.userRepository.count() > 0) {
            return;
        }
        var user = new User();
        user.setPhone("00000000");
        user.setEmail(this.adminEmail);
        user.setName(this.adminEmail);
        user.setRole(Roles.ADMIN);
        user.setPassword(bCryptPasswordEncoder.encode(adminPassword));
        this.userRepository.save(user);
    }
}
