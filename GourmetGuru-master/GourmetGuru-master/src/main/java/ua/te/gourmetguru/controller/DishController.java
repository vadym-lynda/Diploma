package ua.te.gourmetguru.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ua.te.gourmetguru.dto.DishDto;
import ua.te.gourmetguru.service.DishService;

import java.util.List;

@RestController
@RequestMapping("/api/dishes")
@Tag(name = "Страви")
public class DishController {
    private final DishService dishService;

    public DishController(DishService dishService) {
        this.dishService = dishService;
    }

    @PostMapping("/recommend")
    public ResponseEntity<List<DishDto>> recommendDishes(@RequestBody List<String> ingredientNames,
                                                      @RequestParam(name = "cuisine", required = false) String cuisineName) {
        List<DishDto> recommendedDishes = dishService.recommendDishes(ingredientNames, cuisineName);
        return ResponseEntity.ok(recommendedDishes);
    }

    @GetMapping
    public List<DishDto> getAllDishes() {
        return dishService.getAllDishes();
    }
    @GetMapping("/Types/")
    public List<DishDto> getDishesByType() {
        return null; //Todo
    }

    public List<DishDto> getDishesByDifficulty() {
        return null; //Todo
    }

    @GetMapping("/{id}")
    public ResponseEntity<DishDto> getDishById(@PathVariable Long id) {
        DishDto dishDto = dishService.getDishById(id);
        return dishDto != null ? ResponseEntity.ok(dishDto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public DishDto createDish(@RequestBody DishDto dishDto) {
        return dishService.createDish(dishDto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DishDto> updateDish(@PathVariable Long id, @RequestBody DishDto dishDetails) {
        DishDto updatedDish = dishService.updateDish(id, dishDetails);
        return updatedDish != null ? ResponseEntity.ok(updatedDish) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteDish(@PathVariable Long id) {
        dishService.deleteDish(id);
        return ResponseEntity.noContent().build();
    }
}
