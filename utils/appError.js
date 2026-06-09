class appError extends Error{
constructor(){
super();

}
createError(statusCode,message,status){
this.statusCode=statusCode;
this.message=message;
this.status=status;
return this;

}



}
module.exports=new appError();