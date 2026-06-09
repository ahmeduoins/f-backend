let {body,validationResult}=require("express-validator");
module.exports=()=>{

return [body("email").isEmail().withMessage("this is not a password").isLength({min:6}).withMessage("main length is 6")]

}