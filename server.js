import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import cors from 'cors';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(__dirname));

// Hot Pepper API 요청 처리
app.get('/api/restaurants', async (req, res) => {
    try {
        const apiKey = process.env.HOT_PEPPER_API_KEY;
        const { lat, lng, radius, order, genre, page } = req.query;

        const apiUrl = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${apiKey}&lat=${lat}&lng=${lng}&range=${radius}&order=${order}&genre=${genre}&start=${(page - 1) * 10 + 1}&count=10&format=json`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        res.status(500).json({ message: '서버 에러 발생' });
    }
});

// Google Maps API 키를 클라이언트에 전달하는 엔드포인트
app.get('/api/google-maps-key', (req, res) => {
    const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
    res.json({ key: googleMapsApiKey });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

