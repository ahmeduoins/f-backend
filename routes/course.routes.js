let express=require("express");
let {body,validationResult}=require("express-validator");
let courseController=require("../controller/course.controller");
let verification=require("../middlewares/verification")
let allowedTo=require("../middlewares/allwoedto")

let router=express.Router();
let validationBody=require("../middlewares/validitionBody")
// return all courses
router.get("/api/courses",verification,allowedTo("manager","admin","user"),courseController.getAllCourses)
// return couse by id
router.get("/api/courses/:id",verification,allowedTo("manager","admin","user"),courseController.getCourseById)


// create new course

router.post("/api/courses",verification,allowedTo("manager","admin"),validationBody(),
courseController.createCourse

)


// update course by id

router.patch("/api/courses/:id",verification,allowedTo("manager","admin"),courseController.updateCourse)



// delete course by id

router.delete("/api/courses/:id",verification,allowedTo("manager","admin"),courseController.deleteCourse)



module.exports=router;
