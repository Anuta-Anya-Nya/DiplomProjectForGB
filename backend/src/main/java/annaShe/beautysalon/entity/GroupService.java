package annaShe.beautysalon.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name= "group_services")

public class GroupService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    private String groupServiceTitle;
}
