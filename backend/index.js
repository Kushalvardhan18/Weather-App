import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());

app.get('/api/weather', async (req, res) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=31.7167&lon=76.9167&appid=${process.env.API_KEY}`)

        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
})
app.get('/api/forecast', async (req, res) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=31.7167&lon=76.9167&appid=${process.env.API_KEY}`)

        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
})

// app.get('/api/weather/:city', async (req, res) => {
//     try {
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q={city},{country_code}&appid=${process.env.API_KEY}`)
//         const data = await response.json()
//         res.json(data)
//     } catch (error) {
//         res.status(500).json({ error: 'Something went wrong' });
//     }
// })
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));