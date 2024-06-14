require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const userAuthRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const PORT = process.env.PORT || 5500;

mongoose.connect(process.env.DB_URI_DEV, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('CONNECTED TO DATABASE!');
    const app = express();
    app.use(cookieParser());
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());

    app.use('/api/auth', userAuthRoutes);
    app.use('/api/user', userRoutes);
    app.get('/', (req, res) => {
        res.send('Server is up!');
    })
    app.listen(PORT, () => {
        console.log(`Server is running!`);
    })
});