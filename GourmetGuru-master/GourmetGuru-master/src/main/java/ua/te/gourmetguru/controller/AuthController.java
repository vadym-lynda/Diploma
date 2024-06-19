package ua.te.gourmetguru.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ua.te.gourmetguru.dto.JwtAuthenticationResponse;
import ua.te.gourmetguru.dto.SignInRequest;
import ua.te.gourmetguru.dto.SignUpRequest;
import ua.te.gourmetguru.service.AuthenticationService;
import ua.te.gourmetguru.service.UserService;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Аутентифікація")
public class AuthController {
    private final AuthenticationService authenticationService;
    private final UserService userService;

    @Operation(summary = "Реєстрація користувача")
    @PostMapping("/sign-up")
    public JwtAuthenticationResponse signUp(@RequestBody @Valid SignUpRequest request) {
        return authenticationService.signUp(request);
    }

    @Operation(summary = "Авторизація користувача")
    @PostMapping("/sign-in")
    public JwtAuthenticationResponse signIn(@RequestBody @Valid SignInRequest request) {
        return authenticationService.signIn(request);
    }

    @Deprecated
    @PatchMapping("/get-admin-role")
    @Operation(summary = "Отримати  роль ADMIN (для тестування)")
    public void getAdmin() {
        userService.getAdmin();
    }
}

