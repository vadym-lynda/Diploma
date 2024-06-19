package ua.te.gourmetguru.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "Запит на аутентифікацію")
public class SignInRequest {

    @Schema(description = "Ім'я користувача", example = "Іван")
    @Size(min = 3, max = 50, message = "Ім'я користувача має містити від 3 до 50 символів")
    @NotBlank(message = "Ім'я користувача не може бути пустим")
    private String username;

    @Schema(description = "Пароль", example = "my_password")
    @Size(min = 4, max = 255, message = "Довжина паролю повинна бути від 4 до 255 символів")
    @NotBlank(message = "Пароль не може бути пустими")
    private String password;
}