
const errorHandler = (err,req,res,next)=>{
        res.status(err.status || 500).json({
        status:err.status,
        message:err.message,
        stack:err.stack
    })
    
}
module.exports = errorHandler



