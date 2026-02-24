import express from 'express'
import cors from 'cors'
import pool from './db/pools.js'
import dotenv from 'dotenv'

const app = express()

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/', async(req, res) => {
    try {
        res.status(200).json({ message: 'Express server is healthy.' });
    } catch (error) {
        res.status(200).json({ error: error.message });
    }
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Express server is running on port ${PORT}`);
});