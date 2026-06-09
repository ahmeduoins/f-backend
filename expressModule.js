let express=require("express");
let app=express();
require("dotenv").config();
let {body,validationResult}=require("express-validator");
// let courses=require("./data/data");
let mongoose=require("mongoose");
let courseController=require("./controller/course.controller");
let coursesRouter=require("./routes/course.routes")
let cors=require("cors");
let path=require("path")


let bodyParser=require("body-parser");
let url=process.env.MONGO_URL

mongoose.connect(url).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log(err);
})


//body parser
app.use(cors());
app.use(express.json());

app.use("/",coursesRouter);
app.use("/api/users",require("./routes/user.routes"))
app.use("/uploads",express.static(path.join(__dirname,"uploads")))

app.use((req,res)=>{
    res.status(404).json({
        status:"error",
        data:null,
        message:"page not found"
    })
})

app.use((err,req,res,next)=>{

console.log(err);
 res.status(err.statusCode || 500).json({
        status: err.status || "error",
        data: null,
        message: err.message || "internal server error"
    });
})

app.listen(process.env.PORT,()=>{
    console.log("server is running on port 3000");
})


//>>>final project code with authentication and authorization
