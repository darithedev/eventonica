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

// Route that gets all events in local PostgreSQL eventonica database
app.get('/events', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM events');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to create new event and add to local PostgreSQL eventonica db
app.post('/events', async (req, res) => {
    try {
        const { id, event_name, category, date, is_favorite } = req.body;

        const result = await pool.query(
            `INSERT INTO events (event_name, category, date, is_favorite) 
             VALUES ($1, $2, $3, $4) 
             RETURNING *`,
            [event_name, category, date, is_favorite]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to update an event by id (updates the event completely)
app.put('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { event_name, category, date } = req.body;
        
        const result = await pool.query(
            'UPDATE events SET event_name=$1, category=$2, date=$3 WHERE id=$4 RETURNING *',
            [event_name, category, date, id]
        );

        if (result.rows.length === 0) return res.status(404).json({ error: 'This event does not exist!'});

        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Express server is running on port ${PORT}`);
});