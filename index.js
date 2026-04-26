import dotenv from "dotenv";
dotenv.config();
import express from "express"
import mongoose from "mongoose"
import cors from "cors";
import users from "./Routes/Userrouter.js"
import transaction from "./Routes/Transactionrouter.js"
import Addbudject from "./Routes/Budjectrouter.js"
const port=4000
const app=express()

  app.use(cors())

app.use(express.json())
app.get("/",(req,res)=>{
    console.log("server is running")
})
app.listen(port, "0.0.0.0", () => {
   console.log(`Server running on port ${port}`);
});
mongoose.connect("mongodb+srv://dhanrajd158_db_user:Expensetracker@cluster0.d879r9f.mongodb.net")
.then(()=>console.log("Db connected"))
.catch((err)=>console.log(err))

app.use('/',users)
app.use("/",transaction)
app.use("/",Addbudject)