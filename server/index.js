const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const { errorHandler } = require('./middlewares/errorhandler');
const authenticationRoute = require('./routes/authentication');
const applicationRoute = require('./routes/application');
const adminApplication = require('./routes/adminApplication');
const userManagement = require('./routes/userManagement');

mongoose.connect("mongodb://localhost:27017/incupation", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("DB Connection  Successfull");
    })
    .catch((err) => {
        (console.err.message);
    })

// app.use(express.json(),cors())

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}));


app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser());

app.use(express.json());

app.use('/', authenticationRoute)

app.use('/', applicationRoute)

app.use('/admin',adminApplication)

app.use('/admin',userManagement)


app.use(errorHandler)

app.listen(4000, () => {
    console.log("server is on port 4000");
});

