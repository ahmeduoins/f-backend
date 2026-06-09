const { body ,validationResult} = require("express-validator");
let courses=require("../models/courses.model");
let {SUCCESS,ERROR,FEILD}=require("../utils/httpStatusText");
let asyncWrapper=require("../middlewares/asyncWrapper")
const appError = require("../utils/appError");
let getAllCourses=async (req,res)=>{
 let limit=req.query.limit || 2;
 let page=req.query.page||1
 let skip=(page-1)*limit;
 let allCourses=await courses.find({},{"__v":0}).limit(limit).skip(skip);
    res.json({status:SUCCESS,data:{posts:allCourses}});


    
}

let getCourseById=asyncWrapper(

async (req,res,next)=>{
    
    
        let coursesId=req.params.id;
        let course=await courses.findById(coursesId);
        if(!course){
          let error=appError.createError(404,"courses not found",FEILD);
             
                return next(error);

        }
        res.json({status:SUCCESS,data:{posts:course}});
    // catch(err){
    //     res.status(500).json({ status:ERROR,data:null,message:err.message})
    // }

})
let createCourse=asyncWrapper(

 async (req,res,next)=>{
  let errors=validationResult(req);

    if(!errors.isEmpty()){
        let error=appError.createError(400,errors.array(),ERROR);
      return  next(error);
        // return res.status(400).json({status:ERROR,data:null,errors:errors.array()});
    }
    let newCourse=new courses({
        name:req.body.name,
        price:req.body.price
    })
    
    await newCourse.save();
    res.status(200).json({status:SUCCESS,data:{posts:newCourse},message:"course created successfully"});

})

let updateCourse=asyncWrapper(
async (req,res)=>{

    let myId=req.params.id;
    let myUbdate=req.body;

    let course=await courses.findByIdAndUpdate(myId,{$set:{...myUbdate}},{new:true})
    if(!course){
        let error=appError.createError(404,"course not found",FEILD);
        return next(error);

        // return res.status(404).send({status:ERROR,data:null,message:"course not found"});
    }



    res.json({status:SUCCESS,data:{posts:course},message:"course updated successfully"});


// catch(err){
//     res.status(500).json({ status:FEILD,data:null,message:err.message})
// }


})

let deleteCourse=asyncWrapper(
async (req,res)=>{
  
        let myId=req.params.id;
            let deleteCourse=await courses.deleteOne({_id:myId})
            if(!deleteCourse){
                let error=appError.createError(404,"course not found",FEILD);
                return next(error);
                //
                // return res.status(404).send({status:ERROR,data:null,message:"course not found"});
            }
            courses=deleteCourse;
            res.json({status:SUCCESS,data:{posts:deleteCourse},message:"course deleted successfully"});
    
    // catch(err){
    //     res.status(500).json({status:SUCCESS,data:null,message:err.message})
    // }
})

module.exports={
getAllCourses,
getCourseById,
createCourse,
updateCourse,
deleteCourse



}