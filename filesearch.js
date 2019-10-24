var fs = require('fs');
const {dialog} = require('electron').remote;
let content = "Some file that is fun";


function saveFile(filepath,filename,contents){
    fs.writeFile("C:/Users/Kyler.Daybell/Desktop/kyler.txt","kyler was here",()=>{
        return;
    });
}

