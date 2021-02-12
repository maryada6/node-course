const path=require('path');
const hbs=require('hbs');
const express= require('express');
const getWeather= require("./weather")
const app= express();

//set up handlebars engine
app.set('view engine','hbs')
app.set('views',path.join(__dirname,"../templates/views"))
hbs.registerPartials(path.join(__dirname,"../templates/partials"))
//setup static folder to serve
app.use(express.static(path.join(__dirname,"../public")));

//rendering dynamic pages 
app.get( "",(req,res)=>{
    res.render("index",{"title":"Weather-app","name":'Maryada'});
})


app.get("/weather",(req,res)=>{
    if(!req.query.address)
    {
        return res.send({"error":"Enter valid address "})
    }
    
    const send1=[]
    getWeather(req.query.address,(error,response)=>{
        if(error)return res.send({error})
        else 
        {
            response["address"]=req.query.address
          return res.send(response);
        }
         
    })

})


app.get( "/about",(req,res)=>{
    res.render("about",{"title":"About-me","name":'Maryada'});
})
app.get( "/help",(req,res)=>{
    res.render("help",{"title":"Help","name":'Maryada',"message":` "Enter City name in weather page to get your city's weather"`});
})
app.get( "/help/*",(req,res)=>{
    res.render('error' ,{
        "title":"Help","name":'Maryada', "message":"Help article not found"
    })
})
app.get( "*",(req,res)=>{
    res.render('error' ,{
        "title":"404 Page not found","name":'Maryada', "message":"Page you are looking for is not found"
    })
})


app.listen(3000,()=>{console.log("Server is up on port 3000");})