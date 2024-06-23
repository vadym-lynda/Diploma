package ua.te.gourmetguru.configuration;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import ua.te.gourmetguru.domain.Cuisine;
import ua.te.gourmetguru.domain.Dish;
import ua.te.gourmetguru.domain.enums.Difficulty;
import ua.te.gourmetguru.domain.enums.DishType;
import ua.te.gourmetguru.repository.CuisineRepository;
import ua.te.gourmetguru.repository.DishRepository;


@Component
public class MyApplicationRunner implements ApplicationRunner {

    private CuisineRepository cuisineRepository;
    private DishRepository dishRepository;

    public MyApplicationRunner(CuisineRepository cuisineRepository, DishRepository dishRepository) {
        this.cuisineRepository = cuisineRepository;
        this.dishRepository = dishRepository;
    }


    @Override
    public void run(ApplicationArguments args) throws Exception {
        Cuisine ukrainianCuisine = new Cuisine("Українська кухня", "Найкращі українські страви");
        cuisineRepository.save(ukrainianCuisine);

        Cuisine italianCuisine = new Cuisine("Італійська кухня", "Піца, паста, різотто та інші смаколики");
        cuisineRepository.save(italianCuisine);

        Cuisine frenchCuisine = new Cuisine("Французька кухня", "Вишукані страви з багатим смаком");
        cuisineRepository.save(frenchCuisine);

        Cuisine chineseCuisine = new Cuisine("Китайська кухня", "Різноманіття смаків та ароматів");
        cuisineRepository.save(chineseCuisine);

        Cuisine japaneseCuisine = new Cuisine("Японська кухня", "Суші, роли, рамен та інші традиційні страви");
        cuisineRepository.save(japaneseCuisine);

        Cuisine indianCuisine = new Cuisine("Індійська кухня", "Гострі та ароматні страви з каррі");
        cuisineRepository.save(indianCuisine);


        Dish borscht = new Dish("Борщ", "Традиційний український борщ", DishType.FIRST_COURSES, Difficulty.MEDIUM, "https://www.youtube.com/watch?v=vF1B5hs0kdA", ukrainianCuisine);
        dishRepository.save(borscht);
        Dish vareniks = new Dish("Вареники з картоплею", "Традиційний український борщ", DishType.MAIN_DISHES, Difficulty.MEDIUM, "https://www.youtube.com/watch?v=toTVMJL2Noo", ukrainianCuisine);
        dishRepository.save(vareniks);

        Dish holubtsi = new Dish("Голубці", "Капустяне листя, фаршироване м'ясом та рисом", DishType.MAIN_DISHES, Difficulty.HARD, "https://www.youtube.com/watch?v=DJMqrNbx-gQ&themeRefresh=1", ukrainianCuisine);
        dishRepository.save(holubtsi);

        Dish banush = new Dish("Бануш", "Кукурудзяна каша з бринзою та шкварками", DishType.MAIN_DISHES, Difficulty.MEDIUM, "https://www.youtube.com/watch?v=8lWPeMespyo", ukrainianCuisine);
        dishRepository.save(banush);

        Dish deruny = new Dish("Деруни", "Картопляні оладки зі сметаною", DishType.MAIN_DISHES, Difficulty.EASY, "https://www.youtube.com/watch?v=sRl8ejZ2E44", ukrainianCuisine);
        dishRepository.save(deruny);

        Dish syrniki = new Dish("Сирники", "Солодкі сирні оладки", DishType.DESSERTS, Difficulty.EASY, "https://www.youtube.com/watch?v=xwMooZHSJqE", ukrainianCuisine);
        dishRepository.save(syrniki);

        Dish uzvar = new Dish("Узвар", "Компот із сухофруктів", DishType.DRINKS, Difficulty.EASY, "https://www.youtube.com/watch?v=4h0HLyXhWL8", ukrainianCuisine);
        dishRepository.save(uzvar);

    }
}

