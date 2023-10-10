package annaShe.beautysalon.dao;

import annaShe.beautysalon.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServicesRepository extends JpaRepository<Service, Integer> {
}
