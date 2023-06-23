require('dotenv').config();
const express = require('express');
const initDatabase = require('./models/database');
const userRoutes = require('./routes/users');
const serviceRoutes = require('./routes/services');
const cors = require('cors');

const app = express();
const port = process.env.SERVERPORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/services', serviceRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Log the request method and url
app.use((req, res, next) => {
    console.log(`Received ${req.method} request to ${req.originalUrl}`);
    next();
});

initDatabase.then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});
