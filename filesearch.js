var fs = require('fs');
const {dialog} = require('electron').remote;
let content = "Some file that is fun";


function startSave(filename){
    dialog.showSaveDialog((filename) => {
        console.log("in savefile")
        if (filename === undefined){
            console.log("you didn't save the file");
            return;
        }
    
        fs.writeFile(filename, content, (err) => {
            if(err){
                alert("an error ocurred creating the file");
            }
            alert("The file has ben saved successfully");
        });
    });
}

