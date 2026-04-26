import Users from "../Models/Users.js"
import jwt from "jsonwebtoken"
export const adduser=async(req,res)=>{
    try{
        const userdata=new Users(req.body)
        await userdata.save()
        console.log(userdata)
        res.status(201).json({success:true,message:'user added'})
    }
    catch(err){
        if(err.code===11000){
            res.status(400).json({
                succes:false,
                message:"email already exists"
            })
        }
    }
      res.status(500).json({
                succes:false,
                message:"server error"
            })
}

export const checkuser=async(req,res)=>{
    try{
        const {email,password}=req.body
        const isemail=await Users.findOne({email:email})
        const ispassword=await Users.findOne({password:password})
        console.log(email)
          console.log(password)
        if(!isemail){
             console.log(email)
           return res.status(404).json({success:false,message:"email not found"})
        }
         if(!ispassword){
             console.log(password)
           return res.status(404).json({success:false,message:"invalid password"})
        }
        const payload={
            id:isemail._id
        }
        console.log(payload)
        const token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"1d"
        })
        console.log("JWT:", process.env.JWT_SECRET);
        console.log("success")
        res.status(200).json({success:true,message:"user verified",token})
    }
    catch(err){
       res.status(500).json({success:false,message:"server error"})
    }
}