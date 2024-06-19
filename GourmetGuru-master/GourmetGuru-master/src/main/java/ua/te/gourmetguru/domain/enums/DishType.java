package ua.te.gourmetguru.domain.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum DishType {
    COLD_DISHES("Холодні страви, закуски,  салати"),
    FIRST_COURSES("Перші страви"),
    MAIN_DISHES("Основні страви"),
    GARNISH("Гарніри"),
    DESSERTS("Десерти"),
    DRINKS("Напої");

    private final String name;

    DishType(String name) {
        this.name = name;
    }

    @JsonValue
    public String getName() {
        return this.name;
    }
}
