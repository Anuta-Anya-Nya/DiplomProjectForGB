package annaShe.beautysalon.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name= "services")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "group_service_id")
    private int groupServiceId;

    @Column(name = "duration")
    private int duration;

    @Column(name = "price")
    private int price;
}
