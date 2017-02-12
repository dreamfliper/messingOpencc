var OpenCC = require('opencc')
var mode = ["s2t","t2s","s2tw","tw2s","s2twp","tw2sp"]
// Load the default Simplified to Traditional config
var opencc = new OpenCC(mode[4]+".json")

opencc.convert("汉字", (err, converted) => {
  console.log(converted)
});
document.ondragover = document.ondrop = (ev) => {
  ev.preventDefault()
}

document.body.ondrop = (ev) => {
  console.log(ev.dataTransfer.files[0].name)
  store.files.push(
    {name:ev.dataTransfer.file[0].name},
    {add :ev.dataTransfer.file[0].path})
  ev.preventDefault()
  var file = ev.dataTransfer.files[0]
  if(file){
    getAsText(file)
  }
}

function getAsText(readFile) {

  var filebuffer = new FileReader()
  filebuffer.readAsText(readFile)

  // Handle progress, success, and errors
  filebuffer.onprogress = updateProgress
  filebuffer.onload = loaded
  filebuffer.onerror = errorHandler
}

function updateProgress(evt) {
  if (evt.lengthComputable) {
    // evt.loaded and evt.total are ProgressEvent properties
    var loaded = (evt.loaded / evt.total)
    if (loaded < 1) {
      // Increase the prog bar length
      style.width = (loaded * 200) + "px"
    }
  }
}

function loaded(evt) {
  // Obtain the read file data
  var fileString = evt.target.result;
  opencc.convert(fileString, (err, converted) => {
  	// console.log(converted)
	})
	{
  	console.log("start converting")
	}
  // console.log(fileString)
}

function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableError") {
    // The file could not be read
    console.log(evt.target.error)
  }
}