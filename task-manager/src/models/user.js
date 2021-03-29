const mongoose= require("mongoose")
const bcrypt=require("bcryptjs")
const validator= require("validator")
const jwt= require("jsonwebtoken")
const Task= require("./task")
const userSchema= new mongoose.Schema({
    name:{
    type:String,
    required:true,
    trim:true
},
email:{
    type:String,
    required:true,
    trim:true,
    unique:true,
    validate(value){
        if(!validator.isEmail(value))
        {
            throw new Error("Email is invalid")
        }
    }
},
age:{
    type: Number,
    default:0,
    validate(value){
        if(value<0)
        {
            throw new Error("Age must be +ve no")
        }
    }
},
password:{
    type:String,
    trim:true,
    required:true,
    minlength:7,
    validate(value){
        if(value.toLowerCase().includes("password"))
        throw new Error("Invalid password")
    }
},

avatar:{
    type:Buffer
}
,
tokens: [{
   token: {
    type:String,
    required:true
    }
}]

},{
    timestamps:true
}) 

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.generateAuthToken= async function(){
    const user=this;
    const token= jwt.sign({_id: user._id.toString()},'thisismynewcourse')
    user.tokens=user.tokens.concat({token});
    await user.save();
    return token

}

userSchema.methods.toJSON= function(){
    const user=this;
    const userObject= user.toObject();
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

userSchema.statics.findByCredentials= async (email,password)=>{
    const user = await User.findOne({email});
    if(!user)
    {
        throw new Error("unable to login")
    }

    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch)
    {
        throw new Error("unable to login")
    }

    return user
}



userSchema.pre("save",async function(next){
    try {
        if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,8 )
    }
    } catch (error) {
        throw error  
    }
    
    next()
})

//delete user task when user is removed

userSchema.pre("remove",async function(next){
    const user=this;
    await Task.deleteMany({owner:user._id})
    next();
})
const User= mongoose.model("User",userSchema)

module.exports= User;