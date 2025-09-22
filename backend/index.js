import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const DEFAULT_CITY_NAME = "London"
    app.get('/api/weather/:cityId', async (req, res) => {
        const cityName = req.params.cityName || DEFAULT_CITY_NAME
        if (!cityName) return res.status(400).json({ error: "City ID is required" });
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityName}&appid=${process.env.API_KEY}`)
            const data = await response.json()
            res.json(data)
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch weather" });
        }
    })

app.get('/api/forecast/:cityId', async (req, res) => {
    const cityName = req.params.cityId || DEFAULT_CITY_NAME
    if (!cityName) return res.status(400).json({ error: "City ID is required" });
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${cityName}&appid=${process.env.API_KEY}`)
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather forecast" });
    }
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));