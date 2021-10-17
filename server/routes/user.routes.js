const { authJwt } = require("../middlewares");
const { contents } = require('../middlewares');
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/pub/all", 
    controller.allAccess
  );

  app.post(
    "/api/pub/setContent",
    [authJwt.verifyToken, contents.checkDuplicateTableName],
    controller.importFile
  );

  app.get(
    "/api/pub/user", 
    [authJwt.verifyToken], 
    controller.userBoard
  );

  app.get(
    "/api/pub/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    [controller.moderatorBoard, controller.importFile]
  );

  app.get(
    "/api/pub/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
