package annaShe.beautysalon.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name= "masters")
public class Master {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "master_name")
    private String masterName;

    @Column(name = "birthdate")
    private Date birthdate;

    @Column(name = "phone")
    private String phone;

    @Column(name = "position")
    private String position;

    @Column(name = "photo")
    private String photo;

    @Column(name = "about_text")
    private String aboutText;

    @Column(name = "group_service_id")
    private int groupServiceId;

}
