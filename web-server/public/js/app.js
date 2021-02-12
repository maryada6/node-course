console.log("loadeddddddddddd");
const weatherForm= document.querySelector("form");
const search=document.querySelector('input');
const show=document.querySelector("#msg1")
const show2=document.querySelector("#msg2")

console.log(show);
weatherForm.addEventListener("submit",(e)=>{
e.preventDefault();
const address= search.value;
show.textContent="Loading...";
 show2.textContent="";
fetch(`http://localhost:3000/weather?address=${address}`)
.then((response)=>response.json())
.then((data)=>{
if(data.error) 
{show.textContent=(data.error)
 show2.textContent="";
}
else
{
show.textContent= data.address[0].toUpperCase() +  
            data.address.slice(1)+","+data.location
show2.textContent= data.forcast+"°C";
}});

})