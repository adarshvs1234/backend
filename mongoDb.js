const mongoose = require('mongoose')

async function dbConnect(){
    try{
    await mongoose.connect('mongodb+srv://va854173:D95om2Hptxq4bCan@cluster0.pjlho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log("Db connected");
    
}
    catch(e){
        console.log(e)
      }

}
module.exports = dbConnect

