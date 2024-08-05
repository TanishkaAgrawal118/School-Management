import "dotenv/config";
import express from 'express';
import cors from 'cors';
import { configureDb } from "./src/config/DbConfig.js";
import schoolRouter from "./src/routers/schoolRouter.js";
import multer from "multer";

const app = express();

app.use(cors());
app.use(express.json())
// for production 

app.use("/test", (req, res) => {
    res.send("Hello world!");
  });
app.use(schoolRouter);

app.listen(process.env.PORT, ()=>{
    configureDb();
    console.log(`listening on port ${process.env.PORT}`)
});






























