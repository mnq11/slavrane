// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const createDummyData = require("./DB/dummyData");
const winston = require('winston');
const initializeDatabase = require("./DB/databaseSetup");

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

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ message: 'Something broke!' }); // Send JSON response
});

initializeDatabase().then(async (db) => {
    const { sequelize, models } = db;

    // Create dummy data
    try {
        await createDummyData(sequelize, models);
    } catch (err) {
        logger.error('Error during dummy data creation', err);
    }

    // Define routes after database initialization
    const memberRoutes = require('./routes/members');
    app.get('/members', (req, res) => memberController.getAllMembers(req, res, models));

    // Start your server here
    app.listen(port, () => {
        logger.info(`Server is running at http://localhost:${port}`);
    });
}).catch(err => {
    logger.error('Error during database initialization', err);
});
