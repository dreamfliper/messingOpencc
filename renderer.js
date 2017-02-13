// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var OpenCC = require('opencc')
var mode='s2tw',pflag=false
var fs = require('fs');

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
  updatecontent(content){
    this.files[this.state.selected].text=content
  },
  savealltranslate(){
    this.files.forEach(function (file) {
      fs.writeFile(file.add, file.text, function(err) {
       if(err) {
        return console.log(err);
        }
      console.log("The file was saved!");
      });
    })
  },
  files: [
    // { name: 'Learn JavaScript' ,add: 'sample1',text:'sample1'},
    // { name: 'Learn Vue' ,add:'sample2',text:'sample2'},
  ],
}
var totalfiles=0
function clearall(){
    store.state.showcontent=0
    store.state.selected=0
    store.files.splice(0,store.files.length)
    totalfiles=0
    console.log('clear')
}

var tableview = new Vue({
  el: '#tableview',
  data: {
    files:store.files,
    totalfiles:totalfiles,
    sharestate:store.state,
  },
  methods:{
    show:function (index,event) {
      store.changeselected(index)
      store.toggle()
    },
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
      var tmode=pflag ? mode+'p':mode
      console.log(tmode)
      var opencc= new OpenCC(tmode+".json")
      store.updatecontent(opencc.convertSync(store.files[store.getselected()].text))
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

var setting = new Vue({
  el: "#setting",
  methods:{
    s2tw:function () {
      mode='s2tw'
    },
    tw2s:function () {
      mode='tw2s'
    },
    pToggle:function () {
      pflag=!pflag
    },
  }
})

var submit = new Vue({
  el: "#submit",
  methods:{
    submit:function () {
      store.savealltranslate()
    }
  }
})
var clear = new Vue({
  el: "#clear",
  methods:{
    clear:function () {
      clearall()
    }
  }
})

// var mode = ["s2tw","tw2s","s2twp","tw2sp"]
// mode=(translate ? 's2tw':'tw2s')+(option ? 'p':'')

// var opencc = new OpenCC(mode+".json")

// opencc.convert("汉字", (err, converted) => {
//   console.log(converted)
// });
document.ondragover = document.ondrop = (ev) => {
  ev.preventDefault()
}

document.body.ondrop = (ev) => {
  console.log(ev.dataTransfer.files[0].name)
  ev.preventDefault()
  store.files.push(
    {name:ev.dataTransfer.files[0].name,
      add:ev.dataTransfer.files[0].path,
     text:''})
  getAsText(ev.dataTransfer.files[0])
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

// function translate(fileindex) {
//   var fileString = evt.target.result;
//   opencc.convert(fileString, (err, converted) => {
//     // console.log(converted)
//   })
//   {
//     console.log("start converting")
//   }
// }