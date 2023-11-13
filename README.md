# diplom-project-gb

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

docker run --name diplom-project-db -p 9000:3306 -e MYSQL_ROOT_PASSWORD=12345678 -d mysql

К БД подключаюсь по 9000 порту:
datasource.url=jdbc:mysql://localhost:9000/appointment_beauty_salon
Бэк запускается на 8080 порту
Фронт на 8081

npm install axios

CREATE TABLE masters (
id int NOT NULL AUTO_INCREMENT,
master_name varchar(35) NOT NULL,
birthdate date,
phone varchar(25) NOT NULL,
position varchar(25) NOT NULL,
photo varchar(25) NOT NULL,
about_text text,
group_service_id int NOT NULL,
FOREIGN KEY (group_service_id) REFERENCES group_services(id),
PRIMARY KEY (id)
) engine=InnoDB auto_increment=1 default charset=utf8mb3;

CREATE TABLE appointments (
id int NOT NULL AUTO_INCREMENT,
date_appointment varchar(25) NOT NULL,
time_appointment varchar(25) NOT NULL,
user_id int NOT NULL,
master_id int NOT NULL,
service_id int NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (master_id) REFERENCES masters(id),
FOREIGN KEY (service_id) REFERENCES services(id),
PRIMARY KEY (id)
) engine=InnoDB auto_increment=1 default charset=utf8mb3;

INSERT INTO `appointment_beauty_salon`.`appointments` (`id`, `date_appointment`, 'time_appointment', `user_id`, `master_id`, `service_id`) VALUES ('1', '2023-11-01', '10:00:00', '1', '1', '20');
INSERT INTO `appointment_beauty_salon`.`appointments` (`id`, `date_appointment`, 'time_appointment', `user_id`, `master_id`, `service_id`) VALUES ('2', '2023-11-30', '11:00:00', '2', '1', '20');

SELECT \* FROM appointment_beauty_salon.appointments WHERE date_appointment = "2023-12-31" AND master_id = "1";

CREATE TABLE worksImg (
id int NOT NULL AUTO_INCREMENT,
img varchar(35) NOT NULL,
tagID int NOT NULL,
PRIMARY KEY (id)
) engine=InnoDB auto_increment=1 default charset=utf8mb3;

если нет свободного времени или мастера, надо написать, извините, запись на данную дату невозможна

у группы сервиса 3 нет мастера, надо выводить что запись в данный момент нелдоступна??
