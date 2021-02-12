const request= require("request");
const getWeather= (location,callback)=>{
    const apiKey="13393b032f8fdee237a93fad4cfb2a54";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    request({url:url,json:true},(error,response)=>
    {
        if(error)callback("Unable to connect",undefined);
        else if(response.body.cod=='404') callback("Not able to find the city",undefined);
        else if(response.body.cod=='200') {
            const ob=  {"forcast":('In '+response.body.name+","+response.body.sys.country +" we have "+response.body.weather[0].main+"("+response.body.weather[0].description+')'+ " and temperature is " +response.body.main.temp), "location":response.body.sys.country};
            callback(undefined,ob);}
    })
}
module.exports= getWeather;