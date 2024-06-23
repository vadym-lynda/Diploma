package ua.te.gourmetguru.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.te.gourmetguru.dto.DishDto;
import ua.te.gourmetguru.mapper.DishMapper;
import ua.te.gourmetguru.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Користувачі")
public class UserController {
    private final UserService userService;
    private final DishMapper dishMapper;

    public UserController(UserService userService,
                          DishMapper dishMapper) {
        this.userService = userService;
        this.dishMapper = dishMapper;
    }

    @GetMapping("/favourite-dishes")
    public List<DishDto> getFavouriteDishes() {
        return userService.getCurrentUser().getFavoriteDishes()
                .stream().map(dishMapper::dishToDishDto).collect(Collectors.toList());
    }

    //Todo списування кількості продуктів приготовленої страви

    //Todo отримати страви, які можна приготувати з наявних продуктів

    //Todo отримати перелік продуктів, які не вистачає для страви

    //

}
