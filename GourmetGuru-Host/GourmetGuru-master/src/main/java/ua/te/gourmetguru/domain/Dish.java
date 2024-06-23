package ua.te.gourmetguru.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;
import ua.te.gourmetguru.domain.enums.Difficulty;
import ua.te.gourmetguru.domain.enums.DishType;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@Entity
@Table(name = "dish")
public class Dish {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Назва страви обов'язкова")
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private DishType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "difficulty")
    private Difficulty difficulty;

    @NotBlank(message = "Введіть адрес відео")
    @Column(name = "youtube_video_url", nullable = false)
    private String youtubeVideoUrl;

    @OneToMany(mappedBy = "dish", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @JsonIgnore
    private List<IngredientQuantity> ingredientQuantities;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    @JoinColumn(name = "cuisine_id")
    private Cuisine cuisine;

    @ManyToMany(mappedBy = "favoriteDishes")
    @ToString.Exclude
    @JsonIgnore
    private List<User> users = new ArrayList<>();

    public Dish() {
    }

    public Dish(String name, String description, DishType type, Difficulty difficulty, String youtubeVideoUrl, Cuisine cuisine) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.difficulty = difficulty;
        this.youtubeVideoUrl = youtubeVideoUrl;
        this.cuisine = cuisine;
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Dish dish = (Dish) o;
        return getId() != null && Objects.equals(getId(), dish.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
