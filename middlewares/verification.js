let jwt=require("jsonwebtoken")
appError=require("../utils/appError")
let {UNAUTHORIZED,FEILD}=require("../utils/httpStatusText")

let chackToken=(req,res,next)=>{

    const token=req.headers.authorization;

    if(!token){
        let error=appError.createError(401,"you are not authorized to access this route",UNAUTHORIZED)
        return next(error)
    }
    let tokenValue=token.split(" ")[1]
    let jwtverify=jwt.verify(tokenValue,process.env.JWT_SECRET_KEY)
    if(!jwtverify){
        let error=appError.createError(401,"you are not authorized to access this route",UNAUTHORIZED)
        return next(error)


    }
    req.user=jwtverify;
    next()




}

module.exports=chackToken;