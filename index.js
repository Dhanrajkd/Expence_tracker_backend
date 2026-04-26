import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import users from "./Routes/Userrouter.js";
import transaction from "./Routes/Transactionrouter.js";
import Addbudject from "./Routes/Budjectrouter.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
   res.send("server is running");
});

app.use("/", users);
app.use("/", transaction);
app.use("/", Addbudject);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
   console.log("DB connected");

   app.listen(port,"0.0.0.0",()=>{
      console.log(`Server running on ${port}`);
   });

})
.catch(err=>console.log(err));