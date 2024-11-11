const mongoose = require('mongoose')
// const user = require('./userSchema')



const transactionSchema = new mongoose.Schema({

    amount : {
        type:Number,
        // required:[true,"Amount is required"],
        default:0
    },

    

    description:{   
        type:String,
        // required:[true,"Description is required"],
    
    },

    transactionType:{
        type:String,
        // required:[true,"Transaction is required"]
    },

     user:{                                 //one to one (transaction -> user)
    type: mongoose.Types.ObjectId,
     ref: "User"

 },


category :{                               //one to one (transaction -> Category)  

    type : mongoose.Types.ObjectId,
    ref : "Category"
},



},{
    timestamps:true
}

)  
const Transaction = mongoose.model('Transaction',transactionSchema)
// Transaction.find({}).populate("User")
module.exports =Transaction









    