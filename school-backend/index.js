import "dotenv/config";
import express from 'express';
import cors from 'cors';
import { configureDb } from "./src/config/DbConfig.js";
import schoolRouter from "./src/routers/schoolRouter.js";
import multer from "multer";

const app = express();

const corsOptions = {
  origin: ["https://school-management-e99e.vercel.app"],  
  methods: ["GET", "POST", "PUT", "DELETE"],  
  credentials: true
};
app.use(cors(corsOptions));
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
