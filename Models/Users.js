import mongoose from "mongoose";

const usersschema=mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true,
        match:[
             /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
             "please enter valid email"
        ]
    },
    password:{
        type:String,
        required:[true,"password id required"],
        validate:{
            validator:function (value){
                 return /^(?=.*[A-Za-z])(?=.*\d).+$/.test(value);
            },
            message:"Password must contain letters and numbers"
        }
    }
})

export default mongoose.model("Users",usersschema)