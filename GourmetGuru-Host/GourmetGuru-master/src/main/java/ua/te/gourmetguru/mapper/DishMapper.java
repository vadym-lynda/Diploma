package ua.te.gourmetguru.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import ua.te.gourmetguru.domain.Dish;
import ua.te.gourmetguru.dto.DishDto;

@Mapper(componentModel = "spring")
public interface DishMapper {

    DishDto dishToDishDto(Dish dish);

    Dish dishDtoToDish(DishDto dishDto);
}
