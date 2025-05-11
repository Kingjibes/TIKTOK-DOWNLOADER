const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/api/download', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || !url.includes('tiktok.com')) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid TikTok URL' 
      });
    }

    const options = {
      method: 'GET',
      url: 'https://tiktok-video-no-watermark2.p.rapidapi.com/',
      params: { url },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    
    res.json({
      success: true,
      downloadUrl: response.data.data.play
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || 'Download failed'
    });
  }
});

module.exports = app;
