import mongoose from 'mongoose';

const Transactionschema=mongoose.Schema({
    amount:{
        type:Number,
        required:[true,"amount required"]
    },
    method:{
        type:String,
        required:[true,"method is required"]
    },
    paymentfor:{
        type:String,
        require:[true,"payment is required"]
    },
    userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
},
    {
        timestamps:true
    }
)

export default mongoose.model("Transaction",Transactionschema)