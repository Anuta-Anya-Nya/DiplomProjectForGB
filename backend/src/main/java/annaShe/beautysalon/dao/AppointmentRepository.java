package annaShe.beautysalon.dao;

import annaShe.beautysalon.entity.Appointment;
import annaShe.beautysalon.entity.Master;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
    @Query("SELECT u FROM Appointment u WHERE u.dateAppointment = :date")
    List<Appointment> findAppointmentByDate(@Param("date_appointment") Date date);

//    List<Appointment> findByDateAppointment(Date date);
    }
