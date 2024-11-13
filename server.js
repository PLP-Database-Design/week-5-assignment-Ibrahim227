require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;

// Set up the MySQL connection pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// GET all patients with specific details
app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM Patients';
    db.query(query, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to retrieve patients.' });
        }
        res.json(results);
    });
});

// GET all providers with specific details
app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM Providers';
    db.query(query, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to retrieve providers.' });
        }
        res.json(results);
    });
});

// GET patients by first name
app.get('/patients/first-name/:firstName', (req, res) => {
    const { firstName } = req.params;
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM Patients WHERE first_name = ?';
    db.query(query, [firstName], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to retrieve patients by first name.' });
        }
        res.json(results);
    });
});

// GET providers by specialty
app.get('/providers/specialty/:specialty', (req, res) => {
    const { specialty } = req.params;
    const query = 'SELECT first_name, last_name, provider_specialty FROM Providers WHERE provider_specialty = ?';
    db.query(query, [specialty], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to retrieve providers by specialty.' });
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
