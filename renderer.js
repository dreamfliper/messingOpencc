// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var store=0

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
    store
  },
  methods:{
    show:function (event) {
      store=!store
    }
  }
})
var vm = new Vue({
  el: "#content",
  data:{
    store
  }
})