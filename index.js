const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import CORS middleware

const app = express();

// Use CORS middleware
app.use(cors());

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'flight_database'
});


// Define a route to fetch flight details
app.get('/flights', (req, res) => {
    // Query to fetch flight details from the database
    const query = 'SELECT flight_name, from_city, to_city, departure_date FROM flights';

    // Execute the query
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error fetching flights: ' + error);
            res.status(500).json({ error: 'Error fetching flights' });
            return;
        }
        // Send the flight details as JSON response
        res.json(results);
    });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
