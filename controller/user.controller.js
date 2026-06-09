let users=require("../models/users.model")
let asyncWrapper=require("../middlewares/asyncWrapper")
let appError=require("../utils/appError")
let {ERROR,FEILD,SUCCESS}=require("../utils/httpStatusText")
let bcrypt=require("bcrypt")
let {validationResult}=require("express-validator")
let jwt=require("jsonwebtoken")
let generateToken=require("../utils/genretToken")




let getAllUsers=asyncWrapper(async(req,res)=>{

        let limit=+req.query.limit || 10;
        let page=+req.query.page || 1;
        let skip=(page-1)*limit;
        let headers=req.headers;
        console.log(headers);

        let allUsers=await users.find({},{password:0,__v:0}).limit(limit).skip(skip)


        res.status(200).json({
        status:"success",data:allUsers,
        message:"all users"
        })



})

let login=asyncWrapper(async(req,res,next)=>{
    let {email,password}=req.body;
    let validationErrors=validationResult(req);
    if(!validationErrors.isEmpty()){
        let error=appError.createError(400,validationErrors.array()[0].msg,FEILD)
        return next(error)

    }
    let findUser=await users.findOne({email})

    if(!findUser){
    let error=appError.createError(404,"email not found",FEILD)
    return next(error)

    }

    let passwordMatch=await bcrypt.compare(password,findUser.password)
    if(!passwordMatch){

        let error=appError.createError(400,"invalid password",FEILD)
        return next(error)

    }
    let myToken=generateToken({newUserId:findUser._id,email:findUser.email,role:findUser.role},"7d")
    findUser.token=myToken;

    res.status(200).json({
        status:SUCCESS,
        data:findUser,
        message:"login success"



    })






})

let register=asyncWrapper(async(req,res,next)=>{
    let {firstName,lastName,email,password,role}=req.body;
    let emailFind=await users.findOne({email})
    if(emailFind){
    let error=appError.createError(500,"email already exist",FEILD)
    return next(error)

    }

    let passwordHash=await bcrypt.hash(password,12);

    console.log(req.body);
    let newUser=new users({
    firstName,lastName,email,password:passwordHash,role:role||"user",avatar: req.file.filename




        })

        
// generate token
let myToken=generateToken({newUserId:newUser._id,email:newUser.email,role:newUser.role},"7d")


newUser.token=myToken;



await newUser.save();




        res.status(200).json({
        status:"success",
        data:newUser,
        message:"register",

    })


})


module.exports={
    getAllUsers,
    login,
    register
}