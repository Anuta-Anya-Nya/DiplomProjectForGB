package annaShe.beautysalon.dao;

import annaShe.beautysalon.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
