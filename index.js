const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Подключение к базе данных PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Endpoint для приема данных с ESP8266
app.post('/api/sensor-data', async (req, res) => {
  const { soilHumidity, airHumidity, temperature } = req.body;
  try {
    await pool.query(
      'INSERT INTO sensor_data (soil_humidity, air_humidity, temperature, created_at) VALUES ($1, $2, $3, NOW())',
      [soilHumidity, airHumidity, temperature]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint для получения данных на фронтенд
app.get('/api/sensor-data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sensor_data ORDER BY created_at DESC LIMIT 100');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
