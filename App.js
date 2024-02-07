const express = require("express");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h2>Back is working!</h2>");
  });