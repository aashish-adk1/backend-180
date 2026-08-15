import express from "express";
import userRoutes from "./routes/user.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1/users", userRoutes);


app.use(errorMiddleware);
export default app;