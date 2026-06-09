let express=require("express");
let userController=require("../controller/user.controller");
let Router=express.Router();
let {body,validationResult}=require("express-validator");
let validitionsUser=require("../middlewares/validitionsUser")
let verification=require("../middlewares/verification")
let allowedTo=require("../middlewares/allwoedto")
const multer  = require('multer')
let diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')

    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        const fileName = `user-${Date.now()}.${ext}`;
        cb(null, fileName)
    }


})

const upload = multer({ storage: diskStorage,fileFilter: function (req, file, cb) {
let allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
if (!allowedTypes.includes(file.mimetype)) {
cb(appError.createError(400, "only jpeg, jpg and png are allowed", FEILD), false);


}
cb(null, true);


}})


Router.get("/",verification,allowedTo("admin"),userController.getAllUsers)
Router.post("/login",validitionsUser(),userController.login)
Router.post("/register",upload.single("avatar"),userController.register)

module.exports=Router;