require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const memberRoutes = require('./routes/members');
const initDatabase = require('./models/database');

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

initDatabase().then(({ sequelize, Member, Family, Role, Task, Resource, Skill }) => {
    // Now you can use the Member model and other models

    // Start your server here
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});
