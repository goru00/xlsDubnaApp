const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const Role = db.role;

const app = express();

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const corsOption = {
    origin: "http://localhost:8081"
};

db.sequelize.sync({ force: true}).then(() => {
    console.log('DROP');
    initial();
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });
    Role.create({
        id: 2,
        name: "moderator"
    });
    Role.create({
        id: 3,
        name: "admin"
    });
};

app.use(cors(corsOption));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Response /"})
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});