import mongoose from "mongoose";

const budjectschema=mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:"true"
    },
    budject:{
        type:Number,
        required:true
    }
},{timestamps:true})

export default mongoose.model("Budject",budjectschema)