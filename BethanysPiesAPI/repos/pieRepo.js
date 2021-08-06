let fs = require('fs') //built in node module that knows how to work with reading and writing files
const FILE_NAME = "./assets/pies.json"

let pieRepo = {
  get: function(resolve, reject) { //these are two callbacks that are acting as promises
    fs.readFile(FILE_NAME, function (err, data) {
      if(err) {
        reject(err)
      }
      else {
        resolve(JSON.parse(data))
      }
    })
  }, //line 4 = 14 its a function that grabs ALL of the data from pies.json
  getById: function(id, resolve, reject) {
    fs.readFile(FILE_NAME, function(err, data) {
      if(err) {
        reject(err)
      }
      else{
        let pie = JSON.parse(data).find(p => p.id == id) //this line specifically grabs the exact id that is input from the list of items
        resolve(pie)
      }
    })
}, //lines 15-26 grab specific pies based on the id input
search: function(searchObject, resolve, reject) {
  fs.readFile(FILE_NAME, function (err, data) {
    if(err) {
      reject(err)
    }
    else {
      let pies = JSON.parse(data)
      if(searchObject) {
      pies=pies.filter(
        p => (searchObject.id ? p.id == searchObject.id : true) &&
        (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true))
    }
    resolve(pies)
    }
    })
  }
}
//this entire function pulls data from pies.json

module.exports = pieRepo