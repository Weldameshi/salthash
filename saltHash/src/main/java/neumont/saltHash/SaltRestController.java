package neumont.saltHash;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("")
public class SaltRestController {
    @Autowired
    private UserRepo repo;

	@RequestMapping(path="", method=RequestMethod.POST)
	public String createUser(@RequestBody User user) {
		
		repo.save(user);
		return user.getUsername();
		
	}
}
