import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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



export default app;