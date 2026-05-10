import Transaction from "../Models/Transactionmodel.js"
import mongoose from "mongoose"
export const addtransaction=async(req,res)=>{
    try{
        const id=req.user.id
        const {amount,paymentfor,method}=req.body
        if(!amount || !paymentfor || !method){
            res.status(404).json({success:false,message:"all fields required"})
        }
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
        res.status(201).json({success:true,message:"data added"})
    }
    catch(err){
        res.status(500).json({success:false,message:"server error"})
    }
}
export const get_trans_data=async(req,res)=>{
    try{
       const id=req.user.id
       const { month } = req.query
       console.log("API HIT");
       console.log("month",month)
        const transactions = await Transaction.find({userid:id})
        const page=parseInt(req.query.page) || 1
        console.log("page",page)
        const limit=parseInt(req.query.limit) || 5
        const skip=(page-1)*limit
        const startDate = new Date(`${month}-01`);
            const [year, m] = month.split("-");
            const nextMonth = new Date(year, m); 
            const data = await Transaction.find({
                userid: id,
                createdAt: {
                $gte: startDate,
                $lt: nextMonth
                }
            } )
            .skip(skip)
            .limit(limit);
            const totalrecords=await Transaction.find({
                 userid: id,
                createdAt: {
                $gte: startDate,
                $lt: nextMonth
                }
            })
            console.log("data", data);
            console.log("records",Math.ceil(totalrecords.length/limit))
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
                    userid:new mongoose.Types.ObjectId(id),
                     createdAt: {
                    $gte: startDate,
                    $lt: nextMonth
                    }
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
        const totalexpences=expences[0].totalexpences
        if(!transactions){
           return res.status(404).json({success:false,message:"No data"})
        }
        if(!data){
              return res.status(404).json({success:false,message:"No data"})
        }
        res.status(200).json(
            {success:true,
                transactions,
                data,
                totalexpences,
                piedata,
                page,
                limit,
                totalrecords,
                totalpages:Math.ceil(totalrecords.length / limit),
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