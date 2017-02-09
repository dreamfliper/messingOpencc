// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var OpenCC = require('opencc')
var mode = ["s2t","t2s","s2tw","tw2s","s2twp","tw2sp"]

// Load the default Simplified to Traditional config
var opencc = new OpenCC(mode[4]+".json")

// Async API
opencc.convert("汉字", (err, converted) => {
  console.log(converted)
});

