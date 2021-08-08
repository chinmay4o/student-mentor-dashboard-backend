import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import {studentRouter} from "./router/studentRouter.js";
import {mentorRouter} from "./router/mentorRouter.js";

dotenv.config({path : "./config.env"});

const app = express();
app.use(cors());
app.use(express.json());

//mongoose connection
const url = process.env.MONGO_URL;

mongoose.connect(url , {useNewUrlParser : true , useUnifiedTopology : true});
const conn = mongoose.connection;
conn.on("open" , () => console.log("mongodb connected"));


app.use("/" , studentRouter);
app.use("/" , mentorRouter);
app.listen(process.env.PORT , () => console.log("listening on " + process.env.PORT));