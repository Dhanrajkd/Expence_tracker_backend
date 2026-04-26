import Transaction from "../Models/Transactionmodel.js"
import mongoose from "mongoose"
export const addtransaction=async(req,res)=>{
    try{
        const id=req.user.id
        console.log("add_transaction",req.body)
        const data=new Transaction({
            amount:req.body.amount,
            paymentfor:req.body.paymentfor,
            method:req.body.method,
            userid:id
        })
        if(!data){
            res.status(400).json({success:false,message:"data not found"})
        }
        await data.save()
        console.log(data)
        res.status(201).json({success:true,message:"data added"})
    }
    catch(err){
        res.status(500).json({success:false,message:"server error"})
    }
}
export const get_trans_data=async(req,res)=>{
    try{
       const id=req.user.id
        const transactions = await Transaction.find({userid:id})
        console.log("trans",transactions)
        const page=parseInt(req.query.page) || 1
        console.log("page",page)
        const limit=parseInt(req.query.limit) || 5
        const skip=(page-1)*limit
         const totalrecords=await Transaction.countDocuments({userid:id})
         const data=await Transaction.find({userid:id})
         .skip(skip)
        .limit(limit)
         const expences=await Transaction.aggregate([
            {
                $match:{
                  userid:new mongoose.Types.ObjectId(id)
                }
            },
            {
                $group:{
                    _id:null,
                    totalexpences:{$sum:"$amount"}
                }
            }
        ])
        const piedata=await Transaction.aggregate([
            {
                $match:{
                    userid:new mongoose.Types.ObjectId(id)
                }
            },
            {
                $group:{
                    _id:"$paymentfor",
                    totalamount:{$sum:"$amount"}
                }
            },
            {
                $project:{
                    _id:0,
                    paymentfor:"$_id",
                    totalamount:1
                }
            }
        ])
        console.log("piedata",piedata)
        console.log("data",data)
        const totalexpences=expences[0].totalexpences
        if(!transactions){
           return res.status(404).json({success:false,message:"No data"})
        }
        res.status(200).json(
            {success:true,
                data,
                totalexpences,
                piedata,
                page,
                limit,
                totalrecords,
                totalpages:Math.ceil(totalrecords / limit),
            })
    }
    catch(err){
        return  res.status(500).json({success:false,message:"server error"})
    }
}
export const deletedata=async(req,res)=>{
        try{
            const id=req.params.id
            console.log(id)
             if(!id){
            return res.status(404).json({success:false,message:"something wrong"})
            }
            const data=await Transaction.findByIdAndDelete(id)
            res.status(201).json({success:true,message:'delete successfully'})
        }
       catch(err){
            res.status(400).json({success:false,message:"something wrong"})
       }
    }
    export const editdata=async(req,res)=>{
        try{
            const id=req.params.id
            if(!id){
                return res.status(404).json({success:false,message:"id not found"})
            }
            const data=await Transaction.findByIdAndUpdate(id,req.body,{new:true})
            res.json({success:true,message:"data updated"})
        }
        catch(err){
            return res.status(500).json({success:false,message:"server error"})
        }
    }