const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    
    userName:{
        type:String,
        required:[true,"Name is required"]
    },
    emailId:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        
    },

    password:{
        type:String,
        required:[true,"Password is required"],
       },

    transaction:[{                                //one to many (user -> Transaction)
        type:mongoose.Types.ObjectId,
        ref:"Transaction"
    }],


//     category:[{                                 //one to many (user -> Category)
//        type:mongoose.Types.ObjectId,
//       ref:"Category"
//    }],

    
    // Timestamp:true

},{
    timestamps:true
}

)   
const User = mongoose.model('User',userSchema)

module.exports = User
