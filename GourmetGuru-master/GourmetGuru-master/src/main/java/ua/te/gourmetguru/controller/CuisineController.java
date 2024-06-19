package ua.te.gourmetguru.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ua.te.gourmetguru.dto.CuisineDto;
import ua.te.gourmetguru.dto.DishDto;
import ua.te.gourmetguru.service.CuisineService;
import ua.te.gourmetguru.service.DishService;

import java.util.List;

@RestController
@RequestMapping("/api/cuisines")
@Tag(name = "Кухні")
public class CuisineController {
    private final CuisineService cuisineService;
    private final DishService dishService;

    public CuisineController(CuisineService cuisineService, DishService dishService) {
        this.cuisineService = cuisineService;
        this.dishService = dishService;
    }

    @GetMapping
    @Operation(summary ="Отримати список кухонь світу")
    public List<CuisineDto> getAllCuisines() {
        return cuisineService.getAllCuisines();
    }

    @GetMapping("/{cuisineId}/dishes")
    public List<DishDto> getDishesByCuisine(@PathVariable Long cuisineId) {
        return dishService.getDishesByCuisineId(cuisineId);
    }

    @GetMapping("/{id}")
    @Operation(summary ="Отримати опис кухні по ID")
    public ResponseEntity<CuisineDto> getCuisineById(@PathVariable Long id) {
        CuisineDto cuisineDto = cuisineService.getCuisineById(id);
        return cuisineDto != null ? ResponseEntity.ok(cuisineDto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    @Operation(summary ="Створити нову кухню")
    @PreAuthorize("hasRole('ADMIN')")
    public CuisineDto createCuisine(@RequestBody CuisineDto cuisine) {
        return cuisineService.createCuisine(cuisine);
    }

    @PutMapping("/{id}")
    @Operation(summary ="Оновити опис кухні")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CuisineDto> updateCuisine(@PathVariable Long id, @RequestBody CuisineDto cuisineDetails) {
        CuisineDto updatedCuisine = cuisineService.updateCuisine(id, cuisineDetails);
        return updatedCuisine != null ? ResponseEntity.ok(updatedCuisine) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary ="Видалити кухню")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCuisine(@PathVariable Long id) {
        cuisineService.deleteCuisine(id);
        return ResponseEntity.noContent().build();
    }
}
