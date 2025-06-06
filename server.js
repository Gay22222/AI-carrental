require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

if (!OPENROUTER_API_KEY) {
    console.error('Lỗi: OPENROUTER_API_KEY không được định nghĩa trong .env');
    process.exit(1);
}

app.post('/api/chat', async (req, res) => {
    try {
        const { model, messages } = req.body;

        if (!model || !messages) {
            return res.status(400).json({ error: 'Thiếu model hoặc messages' });
        }

        const response = await axios.post(
            OPENROUTER_API_URL,
            {
                model: model,
                messages: messages,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://t9carrental.com',
                    'X-Title': 'T9 Car Rental',
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error('Lỗi:', error.message);
        res.status(500).json({ error: 'Lỗi server nội bộ' });
    }
});

module.exports = app;