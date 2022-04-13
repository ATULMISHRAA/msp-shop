const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./Router/index');

const app = express();

const port = 1122;

const hostname = 'localhost';

const serverDB = 'mongodb+srv://zomato_27:iS3Pgy12FIRNyyHM@cluster0.qmjuc.mongodb.net/mosy_shop?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json());
app.use('/', router);

mongoose.connect(serverDB,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        app.listen(port, hostname, () => {
            console.log(`server is running at ${hostname}:${port}`);
        })
    })
    .catch(err => console.log(err));