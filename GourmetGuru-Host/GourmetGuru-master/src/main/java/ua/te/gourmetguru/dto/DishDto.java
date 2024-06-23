package ua.te.gourmetguru.dto;

import jakarta.validation.constraints.NotBlank;
import ua.te.gourmetguru.domain.enums.Difficulty;
import ua.te.gourmetguru.domain.enums.DishType;

import java.io.Serializable;

/**
 * DTO for {@link ua.te.gourmetguru.domain.Dish}
 */
public record DishDto(Long id, @NotBlank(message = "Назва страви обов'язкова") String name, String description,
                      DishType type, Difficulty difficulty,
                      @NotBlank(message = "Введіть адрес відео") String youtubeVideoUrl,
                      CuisineDto cuisine) implements Serializable {
}