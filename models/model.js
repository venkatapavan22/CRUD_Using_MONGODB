const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    empname:String,
    empsalary:Number,
    empexp:Number
})

const userModel=mongoose.model("david",userSchema);

module.exports=userModel;