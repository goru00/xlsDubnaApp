const Router = require('express');
const router = new Router();
const userController = require('../controllers/user.controller');
const { verifyToken, isAdmin, isModerator, isUser } = require('../middlewares/authJwt');

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get('/public', userController.public);
router.get('/mod', [
    verifyToken,
    isModerator
], userController.moderatorBoard);
router.get('/admin', [
    verifyToken,
    isAdmin
], userController.adminBoard);

module.exports = router;