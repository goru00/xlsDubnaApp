const Router = require('express');
const router = new Router();
const dataController = require('../controllers/data.controller');
const upload = require('../middlewares/upload');
const { verifyToken, isAdminOrModerator } = require('../middlewares/authJwt');
const { checkDuplicateTablename } = require('../middlewares/contentVerify');

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get('/', dataController.get);
router.get('/:id', dataController.get);

//router.get('/download', dataController.download);
router.get('/:id/download', dataController.download);

router.post('/', [
    upload.single("file"), 
    verifyToken, 
    isAdminOrModerator
], dataController.create);

router.patch('/:id', [
    verifyToken,
    isAdminOrModerator,
    checkDuplicateTablename
], dataController.update);

router.delete('/:id', [
    verifyToken,
    isAdminOrModerator
], dataController.delete);

module.exports = router;

