import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

dotenv.config();  // .env 파일 로드

// ES 모듈 환경에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 정적 파일 서빙 (AMAMI 폴더에서 index.html, css, js 제공)
app.use(express.static(__dirname));

// Hot Pepper API 요청 처리
app.get('/api/restaurants', async (req, res) => {
  try {
    const apiKey = process.env.HOT_PEPPER_API_KEY;  // Hot Pepper API 키
    const apiUrl = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${apiKey}&format=json`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    res.json(data);  // 클라이언트로 데이터를 전달
  } catch (error) {
    console.error('Error fetching API:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// HTML 파일 제공 (구글 맵 및 Places API 키 전달)
app.get('/', (req, res) => {
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;  // 구글 맵 및 Places API 키 로드
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Amami</title>
      <link rel="stylesheet" href="css/styles.css">
    </head>
    <body>
      <h1>Restaurant Finder</h1>

      <!-- 구글 Places API 스크립트 (자동완성) -->
      <script async defer
        src="https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places&callback=initAutocomplete">
      </script>

      <!-- 구글 맵을 표시할 div -->
      <div id="map" style="height: 500px; width: 100%;"></div>

      <!-- 구글 맵 API 스크립트 -->
      <script async defer
        src="https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap">
      </script>

      <script src="js/script.js"></script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
