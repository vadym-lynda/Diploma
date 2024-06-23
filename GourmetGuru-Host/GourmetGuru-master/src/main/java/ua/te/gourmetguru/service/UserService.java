package ua.te.gourmetguru.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ua.te.gourmetguru.domain.enums.Role;
import ua.te.gourmetguru.domain.User;
import ua.te.gourmetguru.exception.EmailException;
import ua.te.gourmetguru.exception.UsernameException;
import ua.te.gourmetguru.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;

    public User save(User user) {
        return repository.save(user);
    }

    public User create(User user) {
        if (repository.existsByUsername(user.getUsername())) {
            throw new UsernameException("Користувач з таким іменем вже існує");
        }

        if (repository.existsByEmail(user.getEmail())) {
            throw new EmailException("Користувач з таким email вже існує");
        }

        return save(user);
    }

    public User getByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Користувача не знайдено"));

    }

    public UserDetailsService userDetailsService() {
        return this::getByUsername;
    }

    public User getCurrentUser() {
        // Отримання поточного користувача з контексту Spring Security
        var username = SecurityContextHolder.getContext().getAuthentication().getName();
        return getByUsername(username);
    }

    @Deprecated
    public void getAdmin() {
        var user = getCurrentUser();
        user.setRole(Role.ROLE_ADMIN);
        save(user);
    }
}
