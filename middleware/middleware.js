const userController = require("../controller/userController")
const jwt = require('jsonwebtoken')
require('dotenv').config()


const middleware = (req,res,next)=>{

    
const token =  req.cookies.token
console.log(token);

var decoded = jwt.verify(token,'adarsh')
// console.log(decoded);
req.user = {
    id:decoded.id,
    name:decoded.name
}
// console.log(req.user);
 next()


}
module.exports = middleware



