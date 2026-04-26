import { validationResult } from "express-validator";

export const validator=(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({success:true,errors:errors.array()})
    }
    next()
}