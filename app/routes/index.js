const Router = require('express');
const router = new Router();

const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const contentRouter = require('./content.routes');

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/content', contentRouter);

module.exports = router;