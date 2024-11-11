const Transaction = require("../model/transactionSchema");
const asyncHandler = require('express-async-handler');
const Category = require("../model/categorySchema");
const {Error, default: mongoose} = require('mongoose');
const { findById, findByIdAndUpdate } = require("../model/userSchema");
const User = require("../model/userSchema");
const userController = require("./userController");


const transactionController = {
    

    addTransaction : asyncHandler(async(req,res)=>{
        const {id} = req.user
    
        const {amount,category,description,transactionType} = req.body
       
        if(!amount || !category || !description || !transactionType )
            throw new Error("Data is incomplete")

        let categoryCreated = await  Category.findOne({category})

        if(!categoryCreated){
                 categoryCreated = await Category.create({
                    category,
                    transactionType,
                    user:id  
        })
    }

    //console.log(categoryCreated);
    

  
    const createdTransaction = await Transaction.create({

        amount,
        category:categoryCreated._id,
        description,
        transactionType,
        user:id


    })
   if(!createdTransaction){
    throw new Error("Transaction is not created")
   }
  

  const userUpdate = await User.findByIdAndUpdate(id,{$push:{transaction : createdTransaction._id}},

   {
        new : true,
       runValidators:true
     })                                         //transaction inserted to the db
                              

     const categeoryTransactionUpdate = await Category.findByIdAndUpdate(categoryCreated._id,{$push:{transaction : createdTransaction._id}},

        {
             new : true,
            runValidators:true
          })   

     console.log(categeoryTransactionUpdate);
     
     console.log(userUpdate);
     
res.send("Transaction successfully added")
   
}),  




 updateTransaction : asyncHandler(async(req,res)=>{

    
     const {newAmount,newCategory,newTransactionType,newDescription} =  req.body
 const {id} = req.params
  console.log(id)


  const updatedTransaction = await Transaction.findByIdAndUpdate(id,
    
        {
            amount:newAmount,
            category:newCategory,
            transactionType:newTransactionType,
            description:newDescription

        },{
        
        new : true,
        runValidators : true
 })

   console.log(updatedTransaction)

 
 if(updatedTransaction)
        res.send("Successfully updated")
    
    else
     throw new Error("Data incomplete")
    
}),

getTransaction : asyncHandler(async(req,res)=>{


    const {id} = req.user
    console.log(id)
   const allTransactionData = await Transaction.find({user:id})
    res.send(allTransactionData)

    

}),


deleteTransaction : asyncHandler(async(req,res)=>{   //deleteAllTransactions


    const userId = req.user.id
    
    const {id} = req.params
 
   console.log(id);
    
const transactionDelete = await Transaction.findByIdAndDelete(id);

if(!transactionDelete)
    throw new Error("Transaction doesn't exist ")
 

const userDelete = await User.findByIdAndUpdate(userId ,{ "$pull": {transaction : new mongoose.Types.ObjectId(id)}},

{
        
    new : true,
    runValidators : true
})


res.send("Transaction deleted successfully")


}),



summary : asyncHandler(async(req,res)=>{

    const userId = req.user.id 
    console.log(userId);
    
    const results = await User.aggregate([
        {
            $match: {
              _id: new mongoose.Types.ObjectId(userId)
            }
          },
 {
    $lookup: {
      from: "transactions",  // The collection to join with
      localField: "transaction",  // The field in the user document that holds the transaction ObjectIds
      foreignField: "_id",  // The field in the transaction document that corresponds to the user transaction ID
      as: "transactionDetails"  // The field to store the joined transaction data
    }
  },
  {
    $unwind : "$transactionDetails"
  },
{
  $project : { userName : 0,
    _id:0,
    emailId : 0,
    password : 0,
    transaction : 0,
    createdAt:0,
    updatedAt:0,
    __v:0


  }
}
])


const totalExpense = results.reduce((acc,element)=>{
        acc = element.transactionDetails.amount +acc
         return(acc)
 },0)



    console.log("Total Expense is :",totalExpense);
 
}),


deleteCategory  : asyncHandler(async(req,res)=>{

    const userId = req.user.id
    console.log(userId)

    const {id} = req.params
    console.log(id)

    if(!id)
        throw new Error("Data incomplete")



    console.log("finding transactions")

    const  transactionId = await Transaction.find({category:  new mongoose.Types.ObjectId(id)})
    
   
const transactionDelete = await Transaction.deleteMany({category : new mongoose.Types.ObjectId(id)},

    {
            
        new : true,
        runValidators : true
    })
    
    console.log(transactionDelete)     //transaction deletion

+




console.log("mapping")

const ids =  transactionId.map((element)=>
element._id)

console.log(ids)



const userDelete = await User.findByIdAndUpdate(userId ,{ "$pullAll": { transaction : ids}},

{
        
    new : true,
    runValidators : true
})

console.log(userDelete)                       //userTransactionDeletion


const categoryDeletion = await Category.deleteOne({_id:new mongoose.Types.ObjectId(id)})   //categoryDeletion


res.send("Category deleted")
}),



getCategoryExpense: asyncHandler(async(req,res)=>{

    
    const userId = req.user.id
    console.log(userId);
    
    const {id} = req.params
    console.log(id);
    

    if(!id)
        throw new Error("Incomplete data")


    const results = await Category.aggregate([
        {
          $match: { user: new mongoose.Types.ObjectId(userId),
            _id :  new mongoose.Types.ObjectId(id)
           }
        },
        {
          $lookup: {
            from: "transactions",
            localField: "transaction",
            foreignField: "_id",
            as: "categoryDetails"
          }
        },
        { $unwind: "$categoryDetails" },

    
        
      ]);


      console.log(results)


      const categoryExpense = results.reduce((acc,element)=>{
        acc = element.categoryDetails.amount +acc
         return(acc)
 },0)


  console.log("Total Expense is :",categoryExpense);

      
      
    
}),

categoryTransaction : asyncHandler(async(req,res)=>{         //Full list of transactions        

    const userId  = req.user.id
    console.log(userId)

    const {id} = req.params
    console.log(id);
    
    


   const results = await Category.aggregate([
        {
          $match: { user : new mongoose.Types.ObjectId(userId),
            _id :  new mongoose.Types.ObjectId(id)
          }
        },
          {
           $lookup: {
          from: "transactions",
            localField: "transaction",
             foreignField: "_id",
               as: "categoryTransactions"
           }
         },
         { $unwind: "$categoryTransactions" },
     
      ])
      
     res.send(results);
})

}

module.exports = transactionController

