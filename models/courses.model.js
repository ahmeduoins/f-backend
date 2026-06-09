let mongoose=require("mongoose")


let courseSchema=new mongoose.Schema({

name:{type:String,required:true},
price:{type:Number,required:true},


})


module.exports=mongoose.model("Course",courseSchema)
