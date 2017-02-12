// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var store = {
  debug: true,
  state: {
    showcontent: false,
    selected:0
  },
  toggle () {
    this.state.showcontent = !this.state.showcontent
    this.debug && console.log(this.state.showcontent)
  },
  changeselected(index){
    this.debug && console.log('changeselected to '+index)
    this.state.selected=index
  },
  getselected(){
    return this.state.selected
  },
  files: [
    // { name: 'Learn JavaScript' ,add: 'sample1',text:'sample1'},
    // { name: 'Learn Vue' ,add:'sample2',text:'sample2'},
  ],
}
var totalfiles=0


var tableview = new Vue({
  el: '#tableview',
  data: {
    files:store.files,
    sharestate:store.state.showcontent,
  },
  methods:{
    show:function (index,event) {
      store.changeselected(index)
      store.toggle()
    }
  }
})

var content = new Vue({
  el: "#content",
  data:{
    files:store.files,
    sharestate:store.state,
  },
  methods:{
    getSelectedText:function () {
      return store.files[store.getselected()].text
    },
    toggle:function(){
      store.toggle()
    }
  }
})

// var defaultpic = new Vue({
//   el: "#defaultpic",
//   data:{
//     show:store.selected
//   }
// })



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
  console.log(ev.dataTransfer.files[totalfiles].name)
  ev.preventDefault()
  store.files.push(
    {name:ev.dataTransfer.files[totalfiles].name,
      add:ev.dataTransfer.files[totalfiles].path,
     text:''})
  getAsText(ev.dataTransfer.files[totalfiles])
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
  console.log(typeof(evt.currentTarget.result))
  store.files[totalfiles].text=evt.currentTarget.result
  totalfiles++
}

function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableError") {
    // The file could not be read
    console.log(evt.target.error)
  }
}

function translate(fileindex) {
  var fileString = evt.target.result;
  opencc.convert(fileString, (err, converted) => {
    // console.log(converted)
  })
  {
    console.log("start converting")
  }
}