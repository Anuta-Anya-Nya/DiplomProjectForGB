// Определение маршрутов
// Когда клиент отправляет запрос на конечную точку с помощью HTTP-запроса (GET, POST, PUT, DELETE), нам нужно определить, как сервер будет отвечать, настроив маршруты.

// Мы можем разделить наши маршруты на 2 части: для аутентификации и для авторизации (доступ к защищенным ресурсам).

// Аутентификация:
// POST /api/auth/signup
// POST /api/auth/signin

const { verifySignUp } = require("../authenticat");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};