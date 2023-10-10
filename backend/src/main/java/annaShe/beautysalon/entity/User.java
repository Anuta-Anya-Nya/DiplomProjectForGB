package annaShe.beautysalon.entity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name= "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "user_surname")
    private String userSurname;

    @Column(name = "birthdate")
    private Date birthdate;

    @Column(name = "phone")
    private String phone;

    @Column(name = "user_role")
    private String userRole;

    @Column(name = "login")
    private String login;

    @Column(name = "password")
    private String password;
}
