package ua.te.gourmetguru.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Запит на реєстрацію")
public class SignUpRequest extends SignInRequest {

    @Schema(description = "Адреса електронної пошти", example = "ivan@gmail.com")
    @Size(min = 5, max = 255, message = "Адреса електронної пошти повинна містити від 5 до 255 символів")
    @NotBlank(message = "Адреса електронної пошти не може бути пустою")
    @Email(message = "Адреса електронної пошти повинна бути в форматі user@example.com")
    private String email;
}