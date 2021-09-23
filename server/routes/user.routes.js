const { authJWT } = require('../middleware');
const controller = require('../controllers/user.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/pub/all', controller.allAccess);

    app.get('/api/pub/user',
        [authJWT.verifyToken],
        controller.userBoard
    );

    app.get('/api/pub/mod', 
        [authJWT.verifyToken, authJWT.isModerator],
        controller.moderatorBoard
    );

    app.get('/api/pub/admin',
        [authJWT.verifyToken, authJWT.isAdmin],
        controller.adminBoard
    );

};