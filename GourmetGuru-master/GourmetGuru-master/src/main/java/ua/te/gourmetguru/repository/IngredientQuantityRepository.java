package ua.te.gourmetguru.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.te.gourmetguru.domain.IngredientQuantity;

@Repository
public interface IngredientQuantityRepository extends JpaRepository<IngredientQuantity, Long> {

}
