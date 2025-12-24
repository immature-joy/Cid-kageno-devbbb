// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    const response = await fetch('https://rulebase-bot-1test.onrender.com/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: req.body.message })
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(3000, () => console.log('Proxy running on http://localhost:3000'));
