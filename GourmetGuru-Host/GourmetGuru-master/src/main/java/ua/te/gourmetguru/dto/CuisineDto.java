package ua.te.gourmetguru.dto;

import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

/**
 * DTO for {@link ua.te.gourmetguru.domain.Cuisine}
 */
public record CuisineDto(Long id, @NotBlank(message = "Назва кухні обов’язкова") String name,
                         @NotBlank(message = "Назва кухні обов’язкова") String description) implements Serializable {
}