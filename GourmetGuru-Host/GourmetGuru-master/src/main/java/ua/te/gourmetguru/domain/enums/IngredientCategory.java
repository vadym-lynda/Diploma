package ua.te.gourmetguru.domain.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum IngredientCategory {
    FRUIT("Фрукти"),
    VEGETABLE("Овочі"),
    MEAT("М'ясо"),
    POULTRY("Птиця"),
    FISH_AND_SEAFOOD("Риба та морепродукти"),
    DAIRY("Молочні продукти"),
    GRAIN("Зернові"),
    LEGUME("Бобові"),
    NUT_AND_SEED("Горіхи та насіння"),
    HERB_AND_SPICE("Трави та спеції"),
    OIL_AND_FAT("Олії та жири"),
    SWEETENER("Підсолоджувачі"),
    SAUCE_AND_CONDIMENT("Соуси та приправи"),
    BAKING_AND_DESSERT("Випічка та десерти"),
    BEVERAGE("Напої"),
    OTHER("Інше");

    private final String name;

    IngredientCategory(String name) {
        this.name = name;
    }

    @JsonValue
    public String getName() {
        return name;
    }
}
