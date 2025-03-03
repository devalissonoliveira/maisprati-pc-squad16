package com.br.maisprati.squad16.EncontreMeuPet.application.controllers;

import com.br.maisprati.squad16.EncontreMeuPet.application.requests.CreateUserRequest;
import com.br.maisprati.squad16.EncontreMeuPet.application.requests.LoginRequest;
import com.br.maisprati.squad16.EncontreMeuPet.application.services.TokenService;
import com.br.maisprati.squad16.EncontreMeuPet.domain.dtos.ProfileDTO;
import com.br.maisprati.squad16.EncontreMeuPet.domain.enums.Roles;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Address;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.City;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.State;
import com.br.maisprati.squad16.EncontreMeuPet.domain.models.User;
import com.br.maisprati.squad16.EncontreMeuPet.domain.repositories.AddressRepository;
import com.br.maisprati.squad16.EncontreMeuPet.domain.repositories.CityRepository;
import com.br.maisprati.squad16.EncontreMeuPet.domain.repositories.StateRepository;
import com.br.maisprati.squad16.EncontreMeuPet.domain.repositories.UserRepository;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class AuthorizationController {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final AddressRepository addressRepository;
    private final StateRepository stateRepository;
    private final CityRepository cityRepository;

    public AuthorizationController(UserRepository userRepository,
            AuthenticationManager authenticationManager,
            TokenService tokenService, PasswordEncoder passwordEncoder,
            StateRepository stateRepository, CityRepository cityRepository,
            AddressRepository addressRepository) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
        this.stateRepository = stateRepository;
        this.cityRepository = cityRepository;
        this.addressRepository = addressRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest login) {
        var uPass = new UsernamePasswordAuthenticationToken(login.email(), login.password());
        try {
            var auth = this.authenticationManager.authenticate(uPass);
            System.out.println(auth.getCredentials());
            var token = this.tokenService.generateToken((User) auth.getPrincipal());
            return ResponseEntity.ok().body(new Object() {
                public String accessToken = token;
            });
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Object() {
                public String message = e.getMessage();
            });
        }
    }
    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping("/profile")
    public ResponseEntity<ProfileDTO> profile() {
        var user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var profile = new ProfileDTO(
                user.getName(),
                user.getEmail()
        );
        return ResponseEntity.ok(profile);
    }
    @PostMapping("/register")
    @Transactional
    public ResponseEntity<?> createUser(@RequestBody @Valid CreateUserRequest request) {
        if (this.userRepository.findByEmail(request.email()).isPresent()) {
            return ResponseEntity.unprocessableEntity()
                    .body(new Object() {
                        public String message = "Email já está sendo usado";
                    });
        }

        State state = stateRepository.findByStateCode(request.state())
                .orElseGet(() -> {
                    State newState = new State();
                    newState.setStateCode(request.state());
                    newState.setName(request.state());
                    return stateRepository.save(newState);
                });

        City city = cityRepository.findByNameAndState(request.city(), state)
                .orElseGet(() -> {
                    City newCity = new City();
                    newCity.setState(state);
                    newCity.setName(request.city());
                    return cityRepository.save(newCity);
                });

        Address address = new Address();
        address.setCity(city);
        address.setStreet(request.street());
        address.setNumber(request.number());
        address.setNeighborhood(request.neighborhood());
        address.setPostalCode(request.postalCode());
        address = addressRepository.save(address);

        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPassword(this.passwordEncoder.encode(request.password()));
        user.setPhone(request.phone());
        user.setAddress(address);
        user.setRole(Roles.USER);
        user.setActive(true);
        user.setRegistrationDate(LocalDateTime.now());

        User savedUser = this.userRepository.save(user);

        return ResponseEntity.ok(new Object() {
            public Long id = savedUser.getUserId();
            public String name = savedUser.getName();
            public String email = savedUser.getEmail();
        });
    }
}
