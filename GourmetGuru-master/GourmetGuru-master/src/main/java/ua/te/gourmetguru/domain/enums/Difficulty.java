package ua.te.gourmetguru.domain.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Difficulty {
    EASY("Легкий"),
    MEDIUM("Середній"),
    HARD("Складний"),
    EXPERT("Дуже складний"),
    PROFI("Професійний");

    private final String name;

    Difficulty(String name) {
        this.name = name;
    }

    @JsonValue
    public String getName() {
        return this.name;
    }
}
