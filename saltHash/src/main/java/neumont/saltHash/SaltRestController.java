package neumont.saltHash;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import com.google.common.hash.Hashing;


@RestController
@RequestMapping("salt")
public class SaltRestController {
    @Autowired
    private UserRepo repo;
    private String salt = "salt";
	@RequestMapping(path="", method=RequestMethod.POST)
	public String createUser(@RequestBody User user) {
		String saltedPass = user.getPassword() + salt;
		String encryptPass = Hashing.sha256().hashString
				(saltedPass, StandardCharsets.UTF_8).toString();
		user.setPassword(encryptPass);
		repo.save(user);
		
		return user.getUsername();
		
	}
	@RequestMapping(path="login", method=RequestMethod.POST)
	public Boolean isUser(@RequestBody User user) {
		if(repo.getById(user.getUsername()) != null) {
			String saltedPass = user.getPassword() + salt;
			String encryptPass = Hashing.sha256().hashString
					(saltedPass, StandardCharsets.UTF_8).toString();
			if(repo.getById(user.getUsername()).getPassword().equals(encryptPass)) {
				return true;
			}
		}
		
		
		return false;
		
	}
}
