const express=require('express');
const app=express();
const mongoose=require('mongoose');
const port=4260;
const model=require('./models/model.js')

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}));


//demo api
app.get("/api/users",(request,response)=>{
    response.send("preeethi shetty")
})

//get all data from mongodb 
app.get("/api/users/all/",async(request,response)=>{
    try{
        const db=await model.find({});
        response.status(200).json(db);
    }catch(err){
        response.status(500).json({message:err.message})
    }
})

//insert data into mongodb database
app.post("/api/users/create/",async(request,response)=>{
    try{
        const db=await model.create(request.body);
        response.status(200).json(db);
    }catch(err){
        response.status(500).json({message:err.message});
    }
})


//get data from particular id 
app.get("/api/users/:id",async(request,response)=>{
    try{
        const id=request.params.id;
        const db=await model.findById(id)
        response.status(200).json(db)
    }
    catch(err){
        response.status(500).json({message:err.message})
    }
})

//update data in mongodb database
app.put("/api/users/update/:id",async(request,response)=>{
    try{
        const id=request.params.id;
        const db=await model.findByIdAndUpdate(id,request.body);
        if(!db){
            return response.status(400).json({message:"product not found"})
        }
        const updatedProduct=await model.findById(id);
        response.status(200).json(updatedProduct);
    }
    catch(err){
        response.status(500).json({message:err.message})
    }
    
})

//api for deleting a product
app.delete("/api/users/delete/:id",async(request,response)=>{
    try{
        const id=request.params.id;
        const db=await model.findByIdAndDelete(id);
        if (!db){
            response.status(400).json({message:"product not found"})
        }
        response.status(200).json({message:"items deleted successfully"})
    }catch(err){
        response.status(500).json({message:err.message})
    }
})

//used to connect database(Mongodb)
mongoose.connect('mongodb://localhost:27017/harley').then(()=>{
    console.log("Database is Connected");
    app.listen(port,()=>{
        console.log(`Server is running at port no : ${port}`);
    })
}).catch((err)=>{
    console.log(err)
})
