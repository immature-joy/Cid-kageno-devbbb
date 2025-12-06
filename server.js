require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const multer = require('multer');
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("."));

const API = "https://www.ai4chat.co/api/image/generate'";
const KEY = process.env.AI4CHAT_KEY;

// TEXT → IMAGE
app.post("/api/generate", async (req, res) => {
  const r = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${KEY}`
    },
    body: JSON.stringify({
      prompt: req.body.prompt,
      width: 512,
      height: 512
    })
  });

  res.send(await r.json());
});

// IMAGE → IMAGE (edit)
app.post("/api/edit", upload.single("image"), async (req, res) => {
  const FormData = require("form-data");
  const f = new FormData();
  f.append("image", fs.createReadStream(req.file.path));
  f.append("prompt", req.body.prompt);

  const r = await fetch(API, {
    method: "POST",
    headers: { "Authorization": `Bearer ${KEY}` },
    body: f
  });

  fs.unlinkSync(req.file.path);
  res.send(await r.json());
});

app.listen(3000, () => console.log("Nano Banana running on http://localhost:3000"));
