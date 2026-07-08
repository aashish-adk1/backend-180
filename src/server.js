import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
  res.send("Backend 180 is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});