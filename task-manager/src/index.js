 const mongoose= require("mongoose")
const express=require("express")
require("./db/mongoose")
const userRouter= require("../src/routers/user")
const taskRouter=require("../src/routers/task")
const User=require("./models/user")
const Task=require("./models/task")

const app=express()
const port= process.env.PORT || 3000;


// app.use((req,res,next)=>{
//     if(req.method==='GET'){
//         res.send("get request disableed")
//     }
//     else{
//         next();
//     }
// })

// app.use((req,res,next)=>{
//     res.status(503).send("In maintainance")
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log("Server is up on ",port);
})

// const jwt = require('jsonwebtoken')

// const myFunction= async ()=>{
    
//     try {
//         const token = await jwt.sign({_id:"ahjdbfvdj"},'thisismynewcourse',{expiresIn:"1 minute"})
//     console.log(token);
     
//     const data=jwt.verify(token,"thisismynewcourse")

//     console.log(data)
//     } catch (error) {
//         console.log(error);
//     }
// }
    
// myFunction();
// const myFunction=async()=>{
//         const password="Red"
//         const hashedPassword= await bcrypt.hash(password, 8);
//         console.log({password,hashedPassword});

//         const isMatch=await bcrypt.compare(password,hashedPassword)
//         console.log({isMatch});
// }
// myFunction()