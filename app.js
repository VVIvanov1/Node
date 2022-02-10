const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()
const { engine } = require('express-handlebars')
const cp = require('child_process');
const responseTime = require('response-time');
const assert = require('assert');
const helmet = require('helmet');
// const csp = require('helmet-csp');
const cors = require('cors');




const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const likesRouter = require('./routes/likes')

const app = express();

let corsOptions = {
    origin: ["https://kotoblog.kz"],
    // origin: false,
    preflightContinue: true,
    credentials: true,
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    methods:["GET"]

}
app.use(cors(corsOptions))
// app.options('*', cors({origin: 'https://kotoblog.kz'}))
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });


// app.enable('trust proxy');


//app.use(helmet()); // Take the defaults to start with
// app.use(csp({
//     // Specify directives for content sources
//     directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "'unsafe-inline'", 'ajax.googleapis.com',
//             'maxcdn.bootstrapcdn.com'],
//         styleSrc: ["'self'", "'unsafe-inline'", 'maxcdn.bootstrapcdn.com'],
//         fontSrc: ["'self'", 'maxcdn.bootstrapcdn.com'],
//         imgSrc: ['*']
//     }
// }));
app.use(responseTime());

// const node2 = cp.fork('./worker/app_FORK.js');

// node2.on('exit', function (code) {
//     node2 = undefined;
//     node2 = cp.fork('./worker/app_FORK.js');
// });

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/likes', likesRouter);

module.exports = app;
