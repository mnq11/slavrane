// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const memberRoutes = require('./routes/members');
const initDatabase = require("./DB/databaseSetup");
const createDummyData = require("./DB/dummyData");  // Ensure this path is correct

const app = express();
const port = process.env.SERVERPORT || 3001;

app.use(cors());
app.use(express.json());

// Use morgan to log HTTP requests
app.use(morgan('combined'));

app.use('/members', memberRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


initDatabase().then(async ({ sequelize, models }) => {
    // Now you can use the models

    // Create dummy data
    await createDummyData();

    // Start your server here
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});