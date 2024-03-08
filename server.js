import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import auth from "./routes/auth.js";
import user from "./routes/user.js";
import message from "./routes/message.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const corsOptions = {
  origin: [
    "https://sparkx-8dem.onrender.com/",
    "http://localhost:3001",
    "http://localhost:3000",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

app.use("/auth", auth);
app.use("/users", user);
app.use("/messages", message);

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.port}`);
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("connected to mongodb");
    })
    .catch((err) => {
      console.log(err);
    });
});
