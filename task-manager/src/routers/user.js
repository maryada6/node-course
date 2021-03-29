const express= require("express")
const router= new express.Router()
const User=require("../models/user")
const auth=require("../middleware/auth")
const sharp= require("sharp")
router.get("/test",(req,res)=>{
    res.send("Testing")
})

router.post("/users",async (req,res)=>{
      const user = User(req.body);
      try
        {
        await user.save()
        const token = await user.generateAuthToken()
         res.status(201).send({user,token})}
      catch(e){
        res.status(400).send(e)
      } ; 
})

router.post("/users/login", async(req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    } catch (error) {
        res.status(400).send();
    }
})

router.post("/users/logout",auth,async (req,res)=>{
    try {
        req.user.tokens= req.user.tokens.filter((token)=>{
            return token.token!= req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post("/users/logoutAll",auth,async (req,res)=>{
    try {
        req.user.tokens= [];
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.patch("/users/me",auth,async(req,res)=>{
         const updates=Object.keys(req.body)
         const allowed=["name","password","email","age"]
        const isValid= updates.every((update)=>allowed.includes(update))
        if(!isValid)
        {
            return res.status(400).send({"error":"Invalid update"})
        }
         try {
            const user = req.user
            updates.forEach((update)=>user[update]=req.body[update]);
            
            // const task= await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
            await user.save();
            res.send(user) }
        catch (error) {
        res.status(500).send(error);
    }

    })
    
router.get("/users/me",auth,async (req,res)=>{
    res.send(req.user);
})


router.delete("/users/me",auth,async(req,res)=>{
    try {
        // const user= await User.findByIdAndDelete(req.user._id)
        // if(!user)return res.status(404).send()
        await  req.user.remove()
        res.send(req.user);
    } catch (error) {
         res.status(500).send(error);
        }
    })
    

    const multer= require("multer")
    const upload= multer({
        limits:{
            fileSize: 1000000
        },
        fileFilter(req,file,cb){
             if(!file.originalname.match(/.(jpg|jpeg|png)$/))
             {
                return cb(new Error("pls uplaod a image")); 
             }
             cb(undefined,true);
            
        }
        
    })


router.post('/users/me/avatar',auth,upload.single('avatar'),async (req,res)=>{
    const buffer= await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    //req.user.avatar=req.file.buffer
    req.user.avatar=buffer
    await req.user.save()
    res.send();
},
(error,req,res,next)=>{
    res.status(400).send({error:error.message});
}
)

router.delete('/users/me/avatar',auth,async (req,res)=>{
    req.user.avatar=undefined;
    await req.user.save()
    res.send();
})


router.get('/users/:id/avatar', async (req,res) => {
    try {
        const user= await User.findById(req.params.id);
        if(!user || !user.avatar){
            throw new Error()
        }

        res.set("Content-Type","image/jpg")
        res.send(user.avatar)

    } catch (error) {
        res.status(404).send()
    }
})
    


module.exports=router


    // router.get("/users/:id",async(req,res)=>{
    
    //     try {
    //         const _id=(req.params.id);
    //         const user= await User.findById(_id);
    //          if(!user) return res.status(404).send()
    //             res.send(user) 
    
    //     } catch (error) {
    //          res.status(500).send();
    //     }})