package ua.te.gourmetguru.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@Entity
@Table(name = "cuisine")
public class Cuisine {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Назва кухні обов’язкова")
    @Column(name = "name", nullable = false)
    private String name;

    @NotBlank(message = "Назва кухні обов’язкова")
    @Column(name = "description", nullable = false)
    private String description;

    @OneToMany(mappedBy = "cuisine")
    @ToString.Exclude
    @JsonIgnore
    private List<Dish> dishes;

    @ManyToMany(mappedBy = "favoriteCuisines")
    @ToString.Exclude
    @JsonIgnore
    private List<User> users = new ArrayList<>();

    public Cuisine() {
    }

    public Cuisine(String name, String description) {
        this.name = name;
        this.description = description;
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Cuisine cuisine = (Cuisine) o;
        return getId() != null && Objects.equals(getId(), cuisine.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}