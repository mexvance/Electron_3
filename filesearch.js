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
    listHtml = listHtml.concat("<li onclick=\"\">",file,"</li>")
  }
  console.log(listHtml);
  document.getElementById("fileList").innerHTML = listHtml;
}

function pathIsFile(path, file){
  let fullPath = path.concat("\\",file)
  let stat = fs.statSync(fullPath);
  return stat.isFile()
}

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
      });
    });
}
