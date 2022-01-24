
class User {
    public(req, res) {
        res.status(200).send("Public content");
    }
    userBoard(req, res) {
        res.status(200).send("User content");
    }
    moderatorBoard(req, res) {
        res.status(200).send("Mod content");
    }
    adminBoard(req, res) {
        res.status(200).send("Admin content");
    }
}

module.exports = new User();