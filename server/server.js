const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoute');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

pool.connect()
  .then(()=> console.log('Connected to PostgreSQL database'))
  .catch((err)=> console.error('Error connecting to database', err));
app.set('pool', pool);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});