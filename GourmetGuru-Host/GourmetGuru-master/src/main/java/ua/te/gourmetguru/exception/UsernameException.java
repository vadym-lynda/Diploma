package ua.te.gourmetguru.exception;

public class UsernameException extends RuntimeException {

    public UsernameException(String message) {
        super(message);
    }

    public UsernameException(String message, Throwable cause) {
        super(message, cause);
    }
}
