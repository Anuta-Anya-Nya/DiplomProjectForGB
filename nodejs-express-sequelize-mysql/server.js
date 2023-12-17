const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = require("../nodejs-express-sequelize-mysql/models");

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application." });
});

//routes
require("../nodejs-express-sequelize-mysql/routes/master.routes")(app);
require("../nodejs-express-sequelize-mysql/routes/service.routes")(app);
require("../nodejs-express-sequelize-mysql/routes/group.routes")(app);
require("../nodejs-express-sequelize-mysql/routes/shedule.routes")(app);
require('../nodejs-express-sequelize-mysql/routes/auth.routes')(app);
require('../nodejs-express-sequelize-mysql/routes/user.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


