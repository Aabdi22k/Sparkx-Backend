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

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/auth", auth);
app.use("/users", user);
app.use("/messages", message);

server.listen(process.env.PORT, () => {
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
