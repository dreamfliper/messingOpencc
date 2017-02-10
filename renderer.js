// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var store = {
  debug: true,
  state: {
    showcontent: true
  },
  toggle () {
    this.debug && console.log(this.state.showcontent)
    this.state.showcontent = !this.state.showcontent
  },
}

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
    }
})

var tableview = new Vue({
  el: '#tableview',
  data: {
    files: [
      { name: 'Learn JavaScript' ,add: 'sample1'},
      { name: 'Learn Vue' ,add:'sample2'},
      { name: 'Build something ',add:'sample3' }
    ],
    sharestate:store.state
  },
  methods:{
    show:function (event) {
      store.toggle()
    }
  }
})

var content = new Vue({
  el: "#content",
  data:{
    sharestate:store.state
  }
})