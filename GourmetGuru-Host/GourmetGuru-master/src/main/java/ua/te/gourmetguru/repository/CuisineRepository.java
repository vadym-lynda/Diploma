package ua.te.gourmetguru.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.te.gourmetguru.domain.Cuisine;

@Repository
public interface CuisineRepository extends JpaRepository<Cuisine, Long> {

}
