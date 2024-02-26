const express = require('express');
const axios = require('axios');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to receive MP4 URL and return M3U8 URL
app.get('/convert', async (req, res) => {
    try {
        const mp4Url = req.query.mp4Url;

        if (!mp4Url) {
            return res.status(400).json({ error: 'MP4 URL is required' });
        }

        // Call a function to convert MP4 URL to M3U8 URL
        const m3u8Url = await convertToM3U8(mp4Url);

        res.status(200).json({ m3u8Url });
    } catch (error) {
        console.error('Error converting MP4 to M3U8:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to convert MP4 URL to M3U8 URL
async function convertToM3U8(mp4Url) {
    return new Promise((resolve, reject) => {
        // Use ffmpeg to convert MP4 to M3U8
        const ffmpeg = spawn('ffmpeg', [
            '-i', mp4Url,
            '-c:v', 'libx264',
            '-c:a', 'aac',
            '-f', 'hls',
            '-hls_time', '10',
            '-hls_list_size', '0',
            'output.m3u8'
        ]);

        ffmpeg.on('close', (code) => {
            if (code === 0) {
                resolve('https://test-iota-six-81.vercel.app/output.m3u8'); // Replace with your server domain
            } else {
                reject('FFmpeg conversion failed');
            }
        });
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
