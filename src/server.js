import dotenv from "dotenv/config";

import { connectDB } from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`Environment: ${NODE_ENV}`);
    });
  })
