const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // serve frontend

const PORT = process.env.PORT || 3000;

app.post("/generate", async (req, res) => {
  try {
    const { prompt, quantity } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required." });

    const numImages = Math.min(Math.max(quantity || 4, 1), 10);
    const ratio = "1:1";

    const imageUrls = [];

    for (let i = 0; i < numImages; i++) {
      const response = await axios.get("https://www.ai4chat.co/api/image/generate", {
        params: { prompt, aspect_ratio: ratio },
      });

      if (response.data?.image_link) {
        imageUrls.push(response.data.image_link);
      }
    }

    res.json({ images: imageUrls });
  } catch (err) {
    console.error("Error generating images:", err.message);
    res.status(500).json({ error: "Failed to generate images." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
