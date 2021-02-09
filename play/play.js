const fs= require('fs');

const dataBuffer= fs.readFileSync("./data.json");
const data= JSON.parse(dataBuffer.toString());
data.name="Maryada";
data.age=19;
fs.writeFileSync("./data.json",JSON.stringify(data));
