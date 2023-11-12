package annaShe.beautysalon.dao;

import annaShe.beautysalon.entity.Appointment;
import annaShe.beautysalon.entity.Master;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
//    @Query("SELECT ap FROM Appointment ap WHERE ap.dateAppointment = :date")
//    List<Appointment> getAppointmentByDateAppointment(@Param("date_appointment") String date);



    List<Appointment> getAppointmentsByDateAppointmentAndAndMasterId(String DateAppointment, Integer MasterId);
    }
