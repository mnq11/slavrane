require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const memberRoutes = require('./routes/members');
const { sequelize, models } = require("./DB/databaseSetup");
const createDummyData = require("./DB/dummyData");  // Ensure this path is correct

const app = express();
const port = process.env.SERVER_PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use('/members', memberRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

sequelize.sync().then(async () => {
    // Now you can use the models

    // Create dummy data
    await createDummyData();

    // Start your server here
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Error during database initialization', err);
});
