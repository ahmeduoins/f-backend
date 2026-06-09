let {body,validationResult}=require("express-validator");
let validitaion=()=>{


    return [body("name").notEmpty().withMessage("name is require").isLength({min: 5}).withMessage("min length is 2 digits")]
}
module.exports=validitaion;