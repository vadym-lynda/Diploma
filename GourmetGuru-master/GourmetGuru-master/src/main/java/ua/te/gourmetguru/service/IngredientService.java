package ua.te.gourmetguru.service;

import org.springframework.stereotype.Service;
import ua.te.gourmetguru.repository.IngredientRepository;

@Service
public class IngredientService {
    private final IngredientRepository ingredientRepository;

    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }
}
