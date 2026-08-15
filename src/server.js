import { connectDB } from "./config/db.js";
import app from "./app.js";

import env from "./config/env.js";

const PORT = env.PORT;
const NODE_ENV = env.NODE_ENV;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  });
});
