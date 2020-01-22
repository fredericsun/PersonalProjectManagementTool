package fredericsun.ppmtool.services;

import fredericsun.ppmtool.domain.User;
import fredericsun.ppmtool.exceptions.UsernameAlreadyExistsException;
import fredericsun.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser (User newUser) {
        try {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            // Username has to be unique
            newUser.setUsername(newUser.getUsername());
            // don not display the password
            newUser.setConfirmPassword("");
            return userRepository.save(newUser);
        }catch (Exception e) {
            throw new UsernameAlreadyExistsException("Username '" + newUser.getUsername() + "' already exists");
        }
    }
}
