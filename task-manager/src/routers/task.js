const express= require("express")
const router= new express.Router()
const auth=require("../middleware/auth")
router.get("/test",(req,res)=>{
    res.send("Testing")
})
const Task=require("../models/task")



router.post("/tasks",auth,async (req,res)=>{
      //const task = Task(req.body);
      const task= new Task({
          ...req.body,
          owner:req.user._id
      })
      try{await task.save()
       res.status(201).send(task)}
      catch(e){
        res.status(400).send(e)}})


router.get("/tasks",auth,async (req,res)=>{

 const match={}
 const sort={}
    if(req.query.status){
        match.status= (req.query.status==='true');
    }

    if(req.query.sortBy){
        const parts= req.query.sortBy.split(':');
        sort[parts[0]]= (parts[1]==='desc')?-1:1;
        console.log(sort);
    }

   try{
    await req.user.populate({
        path:'tasks',
        match,
        options:{
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort
        }
    }).execPopulate()
    res.send(req.user.tasks)

    // const find1=await Task.find({owner:req.user._id})
    // res.send(find1)
    }

    catch(e){
        res.status(500).send();
    }
})

router.get("/tasks/:id",auth,async(req,res)=>{
    try {
        const _id=(req.params.id);
        //const task=await Task.findById(_id)
        const task= await Task.findOne({
            _id,owner:req.user._id
        })
        if(!task) return res.status(404).send()
            res.send(task) 
    } catch (e) {
        res.status(500).send(e);
    }})

 router.patch("/tasks/:id",auth,async(req,res)=>{
         const updates=Object.keys(req.body)
         const allowed=["description","status"]
        const isValid= updates.every((update)=>allowed.includes(update))
        if(!isValid)
        {
            return res.status(400).send({"error":"Invalid update"})
        }
         try {
            //  const task = await Task.findById(req.params.id);
       const task= await Task.findOne({_id:req.params.id,owner:req.user._id })
        // const task= await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!task) return res.status(404).send()
        updates.forEach((update)=>task[update]=req.body[update]);
            await task.save();
            res.send(task) }
             catch (error) {
        res.status(500).send(error);
    }

    })

    
    


router.delete("/tasks/:id",auth,async(req,res)=>{
    try {
        const task= await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task)return res.status(404).send()
        res.send(task);
    } catch (error) {
         res.status(500).send(error);
    }
})




module.exports=router