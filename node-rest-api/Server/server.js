const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose');

var mongoDatabase = 'mongodb://localhost:27017/employeeDetails';

const app = express();
mongoose.Promise = global.Promise;

mongoose.connect(mongoDatabase, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('There is problem while connecting database ' + err) }
);

const employeeRoutes = require('../Routes/Employee.route');
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
)
app.use(cors());

const port = process.env.PORT || 4000;
app.use('/api/employees', employeeRoutes);

// Staring our express server
const server = app.listen(port, function () {
    console.log('Server Lisening On Port : ' + port);
});

// 404 Handler
app.use((req, res, next) => {
    next(createError(404))
})
// Base Route
app.get('/', (req, res) => {
    res.send('invaild endpoint')
})
app.get('*', (req, res) => {
    res.sendFile(
        path.join(__dirname, 'dist/crud-employees/index.html'),
    )
})
// error handler
app.use(function (err, req, res, next) {
    console.error(err.message)
    if (!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)
})