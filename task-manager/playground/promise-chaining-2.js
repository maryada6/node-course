require("../src/db/mongoose")
const Task=require("../src/models/task")

Task.findByIdAndRemove("6028e57eaced5014808312ee").then((result)=>{
    console.log(result);
    return Task.countDocuments({"status":false})
})
.then((tasks)=>console.log(tasks))
.catch((e)=>console.log(e))