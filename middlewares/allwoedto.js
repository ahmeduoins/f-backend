let appError=require("../utils/appError")
let {SUCCESS,ERROR,FEILD}=require("../utils/httpStatusText")

module.exports= function(...allowedRoles){

console.log(allowedRoles)
return function(req,res,next){
if(!allowedRoles.includes(req.user.role)){
let erroe=appError.createError(503,"you are not allowed to access this route",FEILD)
next(erroe)
}
next()

}

}