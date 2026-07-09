import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
  res.send("Backend 180 is running...");
});

app.get("/about", (req, res) => {
  res.send("Learning Backend Day 2");
});

app.get("/contact", (req, res) => {
  res.json({
    "name":"Ashish",
    "goal":"Backend Engineer"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});