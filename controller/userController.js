const User = require("../model/userSchema")
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs');
const {Error}  = require("mongoose");
const { findOne, findById } = require("../model/transactionSchema");
const transactionController = require("./transactionController");


// const password = require("password")



const userController = {
    register : asyncHandler(async (req,res) => {
        const {name,email,password} = req.body
        if(!name||!email||!password){
            throw new Error("Data is incomplete")
        }
        const userFound = await User.findOne({emailId:email})


        if(userFound)
            throw new Error("Email already taken")
        
      
        const hashedPassword = await bcrypt.hash(password,10)


        const createdUser = await User.create({
            userName:name,
            emailId:email,
            password:hashedPassword
        })

        if(!createdUser){
            throw new Error("User is not Created")
        }
        const payload = {
            id:createdUser._id,
            name:createdUser.userName
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET_KEY)
        res.cookie('token',token,{
            maxAge:3*24*60*60*1000,
            httpOnly:true,
            secure:false,
            sameSite:'none'
        })
        
        
        
   // const {id} =  req.user


    // const userTransactionUpdate =  User.findByIdAndUpdate(id,{transaction : createdTransaction})  //transaction inserted to the db


        res.send("User successfully created")
    }),
    signIn :asyncHandler(async(req,res)=>{
       
        const {email,password} = req.body 
        //const {id} =  req.user

        const userFound = await User.findOne({emailId: email}) 
       
     if(!userFound){
            throw new Error("Email Incorrect")
        }

        
        const dbPassword = userFound.password
        //console.log(dbPassword);
        
      const comparePassword = await bcrypt.compare(password,dbPassword)
      
       
        
      if(!comparePassword)
        throw new Error("Password Incorrect")
            
   
     const payload = {
            id:userFound._id,
            name:userFound.userName
        } 


        const token = jwt.sign(payload,process.env.JWT_SECRET_KEY)
        res.cookie('token',token,{
            maxAge:3*24*60*60*1000,
            httpOnly:true,
            secure:false,
            sameSite:'none',
     })

     
     //console.log(id);


        res.send("Successfully Signed in")

        
        
                  
        }),

    logout: asyncHandler(async(req,res)=>{
      res.clearCookie("token")
    // res.send("Cookie is deleted successfully")
    res.send("Logout successfully")
      }),

    changePassword : asyncHandler(async(req,res)=>{

        const {newPassword} = req.body  
         const {id} = req.user;

const data = await User.findById(id)  
console.log(data);

const dbPassword = data.password


const comparePassword = await bcrypt.compare(newPassword,dbPassword)
    

 if(comparePassword)
        throw new Error("Password is same as previous")

 const hashedPassword = await bcrypt.hash(newPassword,10)

 const changePassword = await User.findByIdAndUpdate(id,{password:hashedPassword},{
            
       runValidators:true,
       new:true
        
        })
  
 if(!changePassword)
         throw new Error("Password not changed")

    res.send("Password changed successfully")
        
}),

 changeName : asyncHandler(async(req,res)=>{

    const {newName} = req.body
    const {id} = req.user

    const userData = await User.findById(id)
    //console.log(userData);
    
     const name =  userData.userName
     console.log(name);
     

     if(name === newName)
        throw new Error ("userName is same as previous name")
   
const data = await User.findByIdAndUpdate(id,{userName:newName},{new:true,runValidators:true})

   console.log(data);

  // console.log(id);
   
   

if(!data)
    throw new Error("Updation failed") 


    res.send("Name is successfully changed")
 })

}

module.exports = userController

                                                                                                                                                                                                                                                                                                                                                                        

