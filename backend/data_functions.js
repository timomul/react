const fs = require('fs')
const path = require('path')
// const directory = 

module.exports = function(directory){
  function toFileSync(f){
    const outputFile = path.join(directory, f.name + '.json')
    fs.writeFileSync(outputFile, JSON.stringify(f))
  }

  function fromFileSync(){
    const inFile = path.join(directory, 'data' + '.json')
    return JSON.parse(fs.readFileSync(inFile,'utf8'))
  }

  function addToFile(f, cb) {
    // const outputFile = path.join(directory, f.name + '.json')
    const outputFile = 'data1.json'
    fs.writeFile(outputFile, JSON.stringify(f), cb)
  }

  function fromFile(name,cb){
    const inFile = path.join(directory, name + '.json')
    fs.readFile(inFile, 'utf8', (err, data) => {
      if (err) return cb(err);
      try {
        const food = JSON.parse(data)
        cb(null, food)
      } catch (e){ // JSON.parse failed
        cb(new Error(inFile, ' wrong format, json parse error: ',e))
      }
    })
  }
  return {addToFile, fromFile, toFileSync, fromFileSync}
}
