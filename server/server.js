const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models');
const dbConfig = require('./config/db.config');
const Role = db.role;

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected Database');
        initial();
    })
    .catch((err) => {
        console.error('Connection error', err);
        process.exit();
    });
app.get("/", (req, res) => {
    res.json({ message: "Response /" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save((err) => {
                if (err) {
                    console.log('error', err);
                }
                console.log(`Added 'user' to Roles collection`); 
            });
            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'moderator' to roles collection");
            });
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
}