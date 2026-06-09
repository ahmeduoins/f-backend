let jwt=require("jsonwebtoken");
let {SUCCESS,ERROR,FEILD}=require("../utils/httpStatusText")
let appError=require("../utils/appError")


module.exports = (payload, expire) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: expire
    });
    return token;
  } catch (err) {
    throw new Error("token generation failed");
  }
};