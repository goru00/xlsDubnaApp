const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require('./models');
const Role = db.role;

db.mongoose 
    .connect(`mongodb+srv://root:1234@cluster0.txkgt.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-zqjldy-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('successfully connect db');
        initial();
    })
    .catch(err => {
        console.log('connection error' + err);
        process.exit();
    });

function initial()
{
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error initial: ", err);
                }
                console.log("added 'user' to roles collection");
            });
            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error initial: ", err);
                }
                console.log("added 'user' to roles collection");
            });
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error initial: ", err);
                }
                console.log("added 'user' to roles collection");
            });
        }
    });
}

app.get('/', (req, res) => {
    res.json({ message: 'start' });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('server is running: ' + PORT);
});