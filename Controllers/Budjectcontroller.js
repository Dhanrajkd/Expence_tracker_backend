import mongoose from "mongoose"
import Budject from "../Models/Budjectmodel.js"

export const Addbudject=async(req,res)=>{
    try{
        const id=req.user.id
        const{budject}=req.body
        console.log("budject",id)
        console.log("budject",budject)
        const data=await Budject.findOneAndUpdate(
            {userid:id},
            {budject:budject},
            {new:true,upsert:true}
        )
        if(!data){
            return res.status(404).json({success:false,message:"not found"})
        }
        await data.save()
        console.log(data)
        res.status(201).json({success:true,message:"budject saved",budject})
    }
    catch(err){
        return res.status(500).json({success:false,message:"server error"})
    }
}
export const getbudject=async(req,res)=>{
    try{
        const id=req.user.id
        console.log("budject_id",id)
        const data=await Budject.findOne({userid:id})
        const budject_data=data.budject
        res.status(200).json({success:true,message:"data completed",budject_data})
        console.log(data)
        console.log("budjectdata",budject_data)
    }
    catch(err){
        return res.status(500).json({success:false,message:"server error"})
    }
}