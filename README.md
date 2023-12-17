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

Сделать:

3. адаптив кнопки записать
4. вообще адаптив
5. .pages\_\_title общий стиль, как подключить ко всем страницам? button-simple
6. белые линии шапки и подвала растянуть

!!!!! 5. привести в порядок спагетти код на странице "создать запись"


Если появится время:  
8. просмотре записей юзера 9. удаление записей юзера
10 - если появится время - админка, индивидуальное распиcание для каждого мастера, введение и редактирование этого расписание со стороны админа 11. стили переименовать в соответствии с БЭМ и использовать вложенность

glpat-Gcd19NGR1zagGpazrimP

glpat-_s2_HQhNvx5VJ1sqBZVA