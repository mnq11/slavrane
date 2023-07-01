// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const compression = require('compression');
const initializeDatabase = require("./DB/databaseSetup");
const createDummyData = require("./DB/dummyData");
// const createDummyData = require("./DB/dummyData");

const app = express();
const port = process.env.SERVER_PORT || 3001;

// create a logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(helmet());
app.use(compression());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Centralized error handling
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Something broke!' });
});

initializeDatabase().then(async (db) => {
    const { sequelize, models } = db;
    // await createDummyData(sequelize, models);

    app.use((req, res, next) => {
        console.log(`Incoming request: ${req.method} ${req.path}`);
        next();
    });

    // Pass models to routes
    const memberRoutes = require('./routes/members')(models);
    app.use('/members', memberRoutes); // API versioning

    // Start your server here
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}).catch(err => {
    console.log('Error during database initialization', err);
});