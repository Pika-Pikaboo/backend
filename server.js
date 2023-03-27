import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import movies from "./api/movies.route.js";

dotenv.config();

const app = express(),
    PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use("/api/v1/movies", movies);
app.use("*", (req, res) => {
    res.status(404).json({
        error: "Not Found!"
    });
});

export default app;
