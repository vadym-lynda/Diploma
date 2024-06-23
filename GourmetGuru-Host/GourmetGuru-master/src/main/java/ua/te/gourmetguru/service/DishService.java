package ua.te.gourmetguru.service;

import org.springframework.stereotype.Service;
import ua.te.gourmetguru.domain.Dish;
import ua.te.gourmetguru.dto.DishDto;
import ua.te.gourmetguru.exception.EntityNotFoundException;
import ua.te.gourmetguru.mapper.DishMapper;
import ua.te.gourmetguru.repository.CuisineRepository;
import ua.te.gourmetguru.repository.DishRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DishService {
    private final DishRepository dishRepository;
    private final CuisineRepository cuisineRepository;
    private final DishMapper dishMapper;

    public DishService(DishRepository dishRepository, CuisineRepository cuisineRepository, DishMapper dishMapper) {
        this.dishRepository = dishRepository;
        this.cuisineRepository = cuisineRepository;
        this.dishMapper = dishMapper;
    }

    public List<DishDto> recommendDishes(List<String> ingredientNames, String cuisineName) {
        if (cuisineName != null && !cuisineName.isEmpty()) {
            return dishRepository.findByIngredientQuantities_Ingredient_NameIsInAndCuisine_Name(ingredientNames, cuisineName).stream().map(dishMapper::dishToDishDto).collect(Collectors.toList());
        } else {
            return dishRepository.findByIngredientQuantities_Ingredient_NameIsIn(ingredientNames).stream().map(dishMapper::dishToDishDto).collect(Collectors.toList());
        }
    }

    public List<DishDto> getAllDishes() {
        return dishRepository.findAll().stream().map(dishMapper::dishToDishDto).collect(Collectors.toList());
    }

    public List<DishDto> getDishesByCuisineId(Long cuisineId) {
        return dishRepository.findByCuisine_Id(cuisineId).stream().map(dishMapper::dishToDishDto).collect(Collectors.toList());
    }

    public DishDto getDishById(Long id) {
        return dishRepository.findById(id).map(dishMapper::dishToDishDto).orElse(null); // Повертає null, якщо страва не знайдена
    }

    public DishDto createDish(DishDto dishDto) {
        return dishMapper.dishToDishDto(dishRepository.save(dishMapper.dishDtoToDish(dishDto)));
    }

    public DishDto updateDish(Long id, DishDto dishDetails) {
        Dish dish = dishRepository.findById(id).orElse(null);
        if (dish != null) {
            dish.setName(dishDetails.name());
            dish.setDescription(dishDetails.description());
            dish.setType(dishDetails.type());
            dish.setDifficulty(dishDetails.difficulty());
            dish.setYoutubeVideoUrl(dishDetails.youtubeVideoUrl());
            dish.setCuisine(cuisineRepository.getReferenceById(dishDetails.cuisine().id()));
            return dishMapper.dishToDishDto(dishRepository.save(dish));
        } else {
            throw new EntityNotFoundException("Страву із таким ID не знайдено!");
        }
    }

    public void deleteDish(Long id) {
        dishRepository.deleteById(id);
    }
}
