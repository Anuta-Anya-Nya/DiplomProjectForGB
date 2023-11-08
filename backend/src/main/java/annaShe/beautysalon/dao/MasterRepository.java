package annaShe.beautysalon.dao;

import annaShe.beautysalon.entity.Master;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;
@Repository
public interface MasterRepository extends JpaRepository<Master, Integer> {

    @Query("SELECT u FROM Master u WHERE u.id = :id")
    Master getMasterById(@Param("id") Integer id);

}
