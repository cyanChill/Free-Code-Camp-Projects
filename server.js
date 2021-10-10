require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

// My Code
const dns = require("dns");
const url = require("url");
const mongoose = require("mongoose");
const shortenURL = require("./shortenUrl.js");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("Connected to DB");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/shorturl", (req, res) => {
  const { url: lookupUrl } = req.body;
  const { hostname: parsedUrl } = url.parse(lookupUrl);

  if (!parsedUrl) {
    res.json({ error: "Invalid Url" });
    return;
  }

  dns.lookup(parsedUrl, {}, async (err) => {
    if (!err) {
      const result = await findUrl(lookupUrl);

      if (result) {
        const { original_url, short_url } = result;
        res.json({ original_url, short_url });
      } else {
        const { original_url, short_url } = await createEntry(lookupUrl);
        res.json({ original_url, short_url });
      }
    } else {
      res.json({ error: "Invalid Url" });
    }
  });
});

const findUrl = async (url) => {
  const result = await shortenURL.findOne({ original_url: url });
  return result;
};

const createEntry = async (url) => {
  const count = await shortenURL.count();

  const newURL = new shortenURL({
    original_url: url,
    short_url: count + 1,
  });

  try {
    await newURL.save();
    return newURL;
  } catch (err) {
    return { message: "Invalid Url" };
  }
};

app.get("/api/shorturl/:id", async (req, res) => {
  const urlObj = await findUrlByShort(req.params.id);

  if (!urlObj || Object.keys(urlObj).length === 0) {
    res.json({ error: "No short URL found for the given input" });
  } else {
    res.redirect(urlObj["original_url"]);
  }
});

const findUrlByShort = async (urlId) => {
  const id = Number(urlId);
  if (!isNaN(id)) {
    const result = await shortenURL.findOne({ short_url: id });
    return result;
  } else {
    return {};
  }
};

// Handle for requests that don't exist
app.get("*", (req, res) => {
  res.send("Not Found");
});
