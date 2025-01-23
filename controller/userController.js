const User = require("../model/userSchema")
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs');
const { findOne, findById } = require("../model/transactionSchema");
const transactionController = require("./transactionController");


// const password = require("password")



const userController = {
    register : asyncHandler(async (req,res) => {
        
        
        const {username,email,password} = req.body
        if(!username||!email||!password){
            throw new Error("Data is incomplete")
        }
        const maildFound = await User.findOne({emailId:email})

if(maildFound){
    return res.status(400).json({
        errors: { email: "Email is already taken" },
      });
}    
      
    const usernameFound = await User.findOne({userName:username})
    
    if(usernameFound){
        return res.status(400).json({
            errors: { username: "Username is already taken" },
          });
    }
    
const hashedPassword = await bcrypt.hash(password,10)
 

        const createdUser = await User.create({
            userName:username,
            emailId:email,
            password:hashedPassword
        })

        if(!createdUser){
            return res.status(500).json({
                message: "User could not be created. Please try again later.",
              });
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

//  res.status(201).json({
//          message: "User successfully registered",
//              token,
//            });

     res.send(token)
        
        
   // const {id} =  req.user


    // const userTransactionUpdate =  User.findByIdAndUpdate(id,{transaction : createdTransaction})  //transaction inserted to the db


        
    }),
    signIn :asyncHandler(async(req,res)=>{
       console.log(req);
       
        const {email,password} = req.body 
        console.log("hellooo");
        
        if(!email || !password){
            throw new Error("Data incomplete")
        }

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
        console.log(payload);
        
        
const token = jwt.sign(payload,process.env.JWT_SECRET_KEY)
        
        if(!token){
            throw new Error("Token not Generated")
        }
        
        res.cookie('token',token,{
            maxAge:3*24*60*60*1000,
            httpOnly:true,
            secure:false,
            sameSite:'none',
     })

     
     //console.log(id);


        res.send(token)

        
        
                  
        }),

    logout: asyncHandler(async(req,res)=>{
      res.clearCookie("token")
    // res.send("Cookie is deleted successfully")
    res.send("Logout successfully")
      }),


changePassword : asyncHandler(async(req,res)=>{
        console.log("hi");
        const {password,confirmpassword} = req.body 
        console.log("confirmpassword",confirmpassword) 
         const {id} = req.user;

            console.log(req.body)
const data = await User.findById(id)  
console.log(data);


const dbPassword = data.password
console.log("dbPassword",dbPassword)
console.log("newPassword",password);



//tobedone comparing to be done on front end
const comparePassword = await bcrypt.compare(password,dbPassword)

console.log(comparePassword)
// console.log("Passwordhi");


 if(comparePassword){

    return res.status(400).json({ message: "New password cannot be the same as the old one" });
   
}
        
            
const hashedPassword = await bcrypt.hash(password,10)

 const changePassword = await User.findByIdAndUpdate(id,{password:hashedPassword},{
            
       runValidators:true,
       new:true
        
        })
       
  console.log("cp",changePassword)


  
 if(!changePassword)
    return res.status(500).json({ message: "Password change failed" });

 else
 res.json({ success: true, message: "Password changed successfully" });
        
}),



 changeName : asyncHandler(async(req,res)=>{

    const {newName} = req.body
    const {id} = req.user

        console.log("changename",newName)

    const userData = await User.findById(id)
    
    console.log("userData",userData)
    
     const name =  userData.userName
     console.log("cuerrentnamecontroller",name);
     

     if(name === newName)
        throw new Error ("userName is same as previous name")
        //{
        // return res.status(400).json({
        //     errors: { email: "Email is already taken" },
        //   });
        // }
       
   
const data = await User.findByIdAndUpdate(id,{userName:newName},{new:true,runValidators:true})

   console.log(data);


  // console.log(id);
   
   console.log("upadtedcontroller",data)

if(!data)
    return res.status(500).json({ message: "Username change failed" });



const payload = {
    id: data._id,
    name: data.userName,
  };

console.log("payload",payload)


const token = jwt.sign(payload,process.env.JWT_SECRET_KEY)

console.log("token",token)

if(!token){
    throw new Error("Token not Generated")
}

res.cookie('token',token,{
    maxAge:3*24*60*60*1000,
    httpOnly:true,
    secure:false,
    sameSite:'none',
})



// res.json({ success: true, message: "Username changed successfully",token});
res.send(token)



 })

}

module.exports = userController

                                                                                                                                                                                                                                                                                                                                                                        

