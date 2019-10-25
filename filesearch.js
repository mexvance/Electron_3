var fs = require('fs');
const {dialog} = require('electron').remote;
let content = "Some file that is fun";


function saveFile(filepath,filename,contents){
    fs.writeFile("C:/Users/Kyler.Daybell/Desktop/kyler.txt","kyler was here",()=>{
        return;
    });
}

function readFile(fileName, filepath){
    console.log("In ReadFile");
    dialog.showOpenDialog((fileName) => {
        // fileNames is an array that contains all the selected
        if(fileName === undefined){
            console.log("No file selected");
            return;
        }
    
        fs.readFile(filepath, 'utf-8', (err, data) => {
            if(err){
                alert("An error ocurred reading the file :" + err.message);
                return;
            }
    
            // Change how to handle the file content
            console.log("The file content is : " + data);
        });
    });
}
