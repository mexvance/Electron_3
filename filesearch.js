var fs = require('fs');
const {dialog} = require('electron').remote;
let content = "Some file that is fun";


function saveFile(filepath,filename,contents){
    dialog.showSaveDialog(null, {properties:["OpenDirectory"]})
    .then(result=>{
        console.log(result);
        filename = result.filePath;
        console.log(filename);
        fs.writeFile(filename,"brandon was here",()=>{
            return;
        });
    })
}

function readFile(){
    console.log("In ReadFile");
    let filepath;
    dialog.showOpenDialog(null, {properties:["OpenDirectory"]})
    .then(result=>{
        filepath = result.filePaths[0];
        console.log(filepath);
        fs.readFile(filepath, 'utf-8', (err, data) => {
            if(err){
                alert("An error ocurred reading the file :" + err.message);
                return;
            }
            console.log("The file content is : " + data);
            document.getElementById("fileinfoedit").innerHTML = data;
        });
    });
}
