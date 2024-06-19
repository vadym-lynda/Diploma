package ua.te.gourmetguru.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.te.gourmetguru.domain.Dish;

import java.util.List;

@Repository
public interface DishRepository extends JpaRepository<Dish, Long> {
    // Знайдіть страви за списком інгредієнтів та кухнею
    List<Dish> findByIngredientQuantities_Ingredient_NameIsInAndCuisine_Name(List<String> ingredientNames, String cuisineName);

    // Знайдіть страви за списком інгредієнтів (без кухні)
    List<Dish> findByIngredientQuantities_Ingredient_NameIsIn(List<String> ingredientNames);

    // Знайдіть страви за кухнею
    List<Dish> findByCuisine_Id(Long id);
}