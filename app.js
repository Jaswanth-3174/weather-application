const express = require("express");
const https = require("https"); //native module 
const bodyParser = require("body-parser"); //npm

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

//app get
app.get("/",function(req, res){
  res.sendFile(__dirname+"/index.html");
});

//app post
app.post("/",function(req, res){

    //https get
    const q = req.body.cy;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+q+"&units=metric&APPID=0d360b6139ad859c84c1a0a385d82c03#";
  
    https.get(url,function(response){
      console.log('statusCode:', response.statusCode);  // status code
      
      response.on("data",function(data){                // data
        const weatherData = JSON.parse(data);
        const weatherTemp = weatherData.main.temp;
        const weatherDesc = weatherData.weather[0].description;
        const weatherIcon = weatherData.weather[0].icon;
        const weatherIconUrl = "http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";
        
        res.write("<h1>The Weather is currently "+weatherDesc+".</h1>");
        res.write("<h1>The Temperature in "+q+" is "+weatherTemp+" degrees Celcius.<h1>");
        res.write("<img src ="+weatherIconUrl+">");
        res.send();
      });
    });

});


app.listen(3000,function(){
  console.log("Server running, port 3000");
});