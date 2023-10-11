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
date_appointment date NOT NULL,
time_appointment time NOT NULL,
userId int NOT NULL,
masterId int NOT NULL,
serviceId int NOT NULL,
FOREIGN KEY (userId) REFERENCES users(id),
FOREIGN KEY (masterId) REFERENCES masters(id),
FOREIGN KEY (serviceId) REFERENCES services(id),
PRIMARY KEY (id)
) engine=InnoDB auto_increment=1 default charset=utf8mb3;

CREATE TABLE worksImg (
id int NOT NULL AUTO_INCREMENT,
img varchar(35) NOT NULL,
tagID int NOT NULL,
PRIMARY KEY (id)
) engine=InnoDB auto_increment=1 default charset=utf8mb3;



