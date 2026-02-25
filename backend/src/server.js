import express from 'express'
import cors from 'cors'
import pool from './db/pools.js'
import dotenv from 'dotenv'

const app = express()

const PORT = process.env.PORT;

// Middleware for checking database health
const dbHealth = async (req, res, next) => {
    try {
        await pool.query('SELECT 1');
        next();
    } catch (error) {
        return res.status(503).json({ 
            message: 'Express server is healthy. Postgres database is down.',
            server: 'up', 
            database: 'down',
            error: error.message 
        });
    }
}

app.use(express.json());
app.use(cors());
app.use(dbHealth); 

app.get('/', async(req, res) => {
    res.status(200).json({ 
        message: 'Express server is healthy. Postgres database is healthy.',
    });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Express server is running on port ${PORT}`);
});