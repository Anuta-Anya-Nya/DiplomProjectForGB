package annaShe.beautysalon.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import lombok.Data;


import java.time.LocalTime;
import java.util.Date;

@Data
@Entity
@Table(name= "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "date_appointment")
    private String dateAppointment;

    @Column(name = "time_appointment")
    private String timeAppointment;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "master_id")
    private int masterId;

    @Column(name = "service_id")
    private int serviceId;
}
