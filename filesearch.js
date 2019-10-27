var fs = require("fs");
const { dialog } = require("electron").remote;
const ipc = require('electron').ipcRenderer;
var originalfileinfo = "";

function saveFile() {
  dialog
    .showSaveDialog(null, { properties: ["openFile", "openDirectory"], defaultPath: document.getElementById("selectedFile").innerText})
    .then(result => {
        console.log(result);
        if (result.canceled !== true)
        {
            filepath = result.filePath;
            console.log(filepath);
            contents = document.getElementById("fileinfoedit").innerText;
            let savealert = document.getElementById("savepopup")
            let filename = filepath.split("\\").pop();
            let displayPathArr = filepath.split("\\");
            let displayPath = "";
            displayPathArr.pop();
            displayPathArr.forEach(function(element) {
                displayPath += element + "/";
            });
            try{
            fs.writeFile(filename, contents, () => {
                savealert.style.backgroundColor = "success";
                savealert.innerText = filename + " was saved to: " + displayPath;;
                originalfileinfo = document.getElementById("fileinfoedit").innerText;
              });
            }
            catch {
                savealert.style.backgroundColor = "red";
                savealert.innerText = "There was an error saving " +filename;
            }
            savealert.style.display = "block";
            setTimeout(function() {
                savealert.style.display = "none";
            }, 5000);
        }
    });
}

function readDirectory() {
    dialog.showOpenDialog(null, {properties: ["openDirectory"]})
    .then(result => {
      let path = result.filePaths[0];
      document.getElementById("workingDirectory").innerText=path
        fs.readdir(path, (err,files) => {
          let filteredFiles = files.filter(f=>pathIsFile(path, f))
          setFileList(filteredFiles);
        })
    });
}

function setFileList(filteredFiles) {
  let listHtml = "";
  console.log(filteredFiles);
  for(let file of filteredFiles){
    listHtml = listHtml.concat("<li onclick=\"readFile(event)\">",file,"</li>")
  }
  console.log(listHtml);
  document.getElementById("fileList").innerHTML = listHtml;
}

function readFile(event){
    console.log("in read file")
  document.getElementById("selectedFile").innerText = event.target.textContent;
  let filepath = document.getElementById("workingDirectory").innerText;
  document.getElementById("savebutton").innerText = "Save File";
  filepath = filepath.concat("\\", event.target.textContent)
  fs.readFile(filepath, "utf-8", (err, data) => {
    if (err) {
      alert("An error ocurred reading the file :" + err.message);
      return;
    }
    document.getElementById("fileinfoedit").innerText = data;
    originalfileinfo = document.getElementById("fileinfoedit").innerText;
  });
}

function pathIsFile(path, file){
  let fullPath = path.concat("\\",file)
  let stat = fs.statSync(fullPath);
  return stat.isFile()
}

//This is the old read file function that opens up the dialog
function readFileWithDialog() {
  console.log("In ReadFile");
  let filepath;
  dialog
    .showOpenDialog(null, {})
    .then(result => {
        console.log(result.filePaths);
      filepath = result.filePaths[0];
      console.log(filepath);
      fs.readFile(filepath, "utf-8", (err, data) => {
        if (err) {
          alert("An error ocurred reading the file :" + err.message);
          return;
        }
        console.log("The file content is : " + data);
        document.getElementById("fileinfoedit").innerText = data;
        originalfileinfo = document.getElementById("fileinfoedit").innerText
      });
    });
}
ipc.on('app-close', () => {
    console.log("Got to ipc listener")
    let textIsDirty = document.getElementById("fileinfoedit").innerText != originalfileinfo;
    console.log(document.getElementById("fileinfoedit").innerText)
    console.log(originalfileinfo)
    ipc.send('closed', textIsDirty)
})

