package ua.te.gourmetguru.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import ua.te.gourmetguru.domain.Cuisine;
import ua.te.gourmetguru.dto.CuisineDto;

@Mapper(componentModel = "spring")
public interface CuisineMapper {

    Cuisine cuisineDtoToCuisine(CuisineDto cuisineDto);

    CuisineDto cuisineToCuisineDto(Cuisine cuisine);
}
