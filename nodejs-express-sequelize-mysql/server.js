// Express предназначен для создания Rest api
const express = require("express");

// помогает проанализировать запрос и создать объект req.body
// const bodyParser = require("body-parser");

// предоставляет экспресс-промежуточное программное обеспечение для включения CORS с различными опциями.
const cors = require("cors");

// – создаем express приложение, затем добавьте body-parser и промежуточное программное обеспечение cors, используя метод app.use(). Обратите внимание, что мы устанавливаем origin: http://localhost:8081
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// // parse requests of content-type - application/json
// app.use(bodyParser.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

const db = require("../nodejs-express-sequelize-mysql/models");
// const Role = db.role;

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });
// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
//   });


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application." });
});

//routes

require("../nodejs-express-sequelize-mysql/routes/master.routes")(app);
require("../nodejs-express-sequelize-mysql/routes/service.routes")(app);
require('../nodejs-express-sequelize-mysql/routes/auth.routes')(app);
require('../nodejs-express-sequelize-mysql/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

//   Now let’s run the app with command: node server.js.
// Open your browser with url http://localhost:8080/, you will see:

// db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });
// function initial() {
//     Role.create({
//       id: 1,
//       name: "user"
//     });
   
//     Role.create({
//       id: 2,
//       name: "moderator"
//     });
   
//     Role.create({
//       id: 3,
//       name: "admin"
//     });
//   }
