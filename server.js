const express = require("express");
const axios = require("axios");
const cors = require("cors");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const app = express();

app.use(cors());
app.use(express.json());

// --------------------------------------------------------
// CONFIG
// --------------------------------------------------------
const AI4CHAT_API = "https://www.ai4chat.co/api/image/generate";
const API_KEY = "YOUR_AI4CHAT_API_KEY"; // keep this secret!

// --------------------------------------------------------
// GENERATE IMAGE (TEXT → IMAGE)
// --------------------------------------------------------
app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, width, height, aspect_ratio } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const response = await axios.get(AI4CHAT_API, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      },
      params: {
        prompt,
        width: width || 768,
        height: height || 768,
        aspect_ratio: aspect_ratio || "1:1"
      }
    });

    return res.json(response.data);
  } catch (err) {
    console.error("GENERATE ERROR:", err.response?.data || err.message);
    return res.status(500).json({ error: "Failed to generate image" });
  }
});

// --------------------------------------------------------
// EDIT IMAGE (IMAGE → IMAGE)
// --------------------------------------------------------
app.post("/api/edit", upload.single("image"), async (req, res) => {
  try {
    const prompt = req.body.prompt || "";
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "Missing image file" });
    }

    const form = new FormData();
    form.append("prompt", prompt);
    form.append("image", file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype
    });

    const response = await axios.post(AI4CHAT_API, form, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        ...form.getHeaders()
      }
    });

    return res.json(response.data);
  } catch (err) {
    console.error("EDIT ERROR:", err.response?.data || err.message);
    return res.status(500).json({ error: "Failed to edit image" });
  }
});

// --------------------------------------------------------
// SERVER START
// --------------------------------------------------------
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Nano Banana backend running at http://localhost:${PORT}`);
});
