const express = require('express');
const cors = require('cors');
const router = require('./routes/index');

const app = express();

var corsOptions = {
    origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/v1/api/', router);

const db = require('./models');
const Role = db.role;

db.mongoose 
    .connect(`mongodb://root:1234@cluster0-shard-00-00.txkgt.mongodb.net:27017,cluster0-shard-00-01.txkgt.mongodb.net:27017,cluster0-shard-00-02.txkgt.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-zqjldy-shard-0&authSource=admin&retryWrites=true&w=majority`, 
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
                    return;
                }
                console.log("added 'user' to roles collection");
            });
            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error initial: ", err);
                    return;
                }
                console.log("added 'moderator' to roles collection");
            });
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error initial: ", err);
                    return;
                }
                console.log("added 'admin' to roles collection");
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