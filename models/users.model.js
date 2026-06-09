let mongose=require("mongoose");
let validator=require("validator");
let userSchema=new mongose.Schema({
firstName:{
    type:String,
    required:true
},
lastName:{
    type:String,
    required:true
},


email:{

    type:String,
    required:true,
    unique:true,
    vailidate:[validator.isEmail,"invalid email"]
},
password:{
    type:String,
    required:true
},
token:{
type:String

},

role:{
type:String,
enum:["admin","manager","user"],
default:"user"


},
avatar:{
type:String,
default:"../uploads/img_profile.jpg"


}




})

module.exports=mongose.model("users",userSchema)



