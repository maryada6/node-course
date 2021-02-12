const getWeather= require("./weather")
getWeather('Mumbai',(error,response)=>{
    if(error)console.log(error);
    else
    console.log('In '+response.name+" we have "+response["weather"]+"("+response['weather-description']+')'+ " and temperature is " +response['weather-main'].temp);})