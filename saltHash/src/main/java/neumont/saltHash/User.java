package neumont.saltHash;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name = "user")
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user")
public class User implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
    @Column(name = "username")
    private String username;
    
    @Column(name = "password")
    private String password;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
