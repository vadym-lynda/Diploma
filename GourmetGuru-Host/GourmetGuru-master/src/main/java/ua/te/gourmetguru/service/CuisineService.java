package ua.te.gourmetguru.service;

import org.springframework.stereotype.Service;
import ua.te.gourmetguru.domain.Cuisine;
import ua.te.gourmetguru.dto.CuisineDto;
import ua.te.gourmetguru.exception.EntityNotFoundException;
import ua.te.gourmetguru.mapper.CuisineMapper;
import ua.te.gourmetguru.repository.CuisineRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CuisineService {
    private final CuisineRepository cuisineRepository;
    private final CuisineMapper cuisineMapper;

    public CuisineService(CuisineRepository cuisineRepository,
                          CuisineMapper cuisineMapper) {
        this.cuisineRepository = cuisineRepository;
        this.cuisineMapper = cuisineMapper;
    }

    public List<CuisineDto> getAllCuisines() {
        return cuisineRepository.findAll().stream().map(cuisineMapper::cuisineToCuisineDto).collect(Collectors.toList());
    }

    public CuisineDto getCuisineById(Long id) {
        return cuisineRepository.findById(id).map(cuisineMapper::cuisineToCuisineDto).orElse(null);
    }

    public CuisineDto createCuisine(CuisineDto cuisineDto) {
        return cuisineMapper.cuisineToCuisineDto(cuisineRepository.save(cuisineMapper.cuisineDtoToCuisine(cuisineDto)));
    }

    public CuisineDto updateCuisine(Long id, CuisineDto cuisineDetails) {
        Cuisine cuisine = cuisineRepository.findById(id).orElse(null);
        if (cuisine != null) {
            cuisine.setName(cuisineDetails.name());
            cuisine.setDescription(cuisineDetails.description());
            return cuisineMapper.cuisineToCuisineDto(cuisineRepository.save(cuisine));
        } else {
            throw new EntityNotFoundException("Кухні не знайдено!");
        }
    }

    public void deleteCuisine(Long id) {
        cuisineRepository.deleteById(id);
    }
}
