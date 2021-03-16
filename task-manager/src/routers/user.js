const express= require("express")
const router= new express.Router()
const User=require("../models/user")
const auth=require("../middleware/auth")

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