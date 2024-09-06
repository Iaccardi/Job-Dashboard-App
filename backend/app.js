const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config();
const cookieParser = require('cookie-parser');




const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Add both frontend and backend origins
    credentials: true, // Allow cookies to be sent with credentials
};

// Use cors middleware with options
app.use(cors(corsOptions));


// Middleware
app.use(bodyParser.json());
app.use(cookieParser());


const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const jobListings = require('./routes/jobListings');
const contactRoutes = require('./routes/contactRoutes');



// Use the routers as middleware
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', jobListings);
app.use('/api/contacts', contactRoutes);



// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nino10490',
    database: 'career_db',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to DB', err);
        return;
    }

    console.log('Connected to MYSQL DB');
});

process.on('exit', () => {
    db.end();
});
