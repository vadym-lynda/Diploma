package ua.te.gourmetguru.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.te.gourmetguru.service.UserService;

@RestController
@RequestMapping("/example")
@RequiredArgsConstructor
@Tag(name = "Приклади", description = "Приклади запитів з різними правами доступу")
public class ExampleController {
    private final UserService service;

    @GetMapping
    @Operation(summary = "Доступний лише авторизованим користувачам")
    public String example() {
        return "Hello, world!";
    }

    @GetMapping("/admin")
    @Operation(summary = "Достуний лише авторизованим користувачам з ролю ADMIN")
    @PreAuthorize("hasRole('ADMIN')")
    public String exampleAdmin() {
        return "Привіт, admin!";
    }
}