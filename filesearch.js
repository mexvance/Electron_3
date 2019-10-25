var fs = require("fs");
const { dialog } = require("electron").remote;

function saveFile(filepath, filename, contents) {
  dialog
    .showSaveDialog(null, { properties: ["OpenDirectory"] })
    .then(result => {
      console.log(result);
      filename = result.filePath;
      console.log(filename);
      contents = document.getElementById("fileinfoedit").innerText;
      fs.writeFile(filename, contents, () => {
        return;
      });
    });
}

function readDirectory() {
    dialog.showOpenDialog(null, {properties: ["openDirectory"]})
    .then(result => {
        fs.readdir(result.filePaths[0], (err,files) => {
          console.log(files);
          let filteredFiles = files.filter(f=>pathIsFile(result.filePaths[0], f))
          console.log(filteredFiles);
        })
    });
}

function pathIsFile(path, file){
  let fullPath = path.concat("\\",file)
  let stat = fs.statSync(fullPath);
  return stat.isFile()
}

function readFile() {
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
      });
    });
}
