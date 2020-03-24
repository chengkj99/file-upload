const fs = require('fs')
const path = require('path')

function getDirInfo(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, function (err, files) {
      if (err) {
        reject(err)
      }

      var count = files.length
      var results = {}

      files.forEach(function (filename) {
        const filePath = path.resolve(__dirname, dir, filename)
        fs.stat(filePath, function (err, stats) {
          if (err) {
            reject(err)
          }
          results[filename] = {
            name: filename,
            ...stats
          }
          count--
          if (count <= 0) {
            resolve(results)
          }
        })
      })
    })
  })
}

module.exports = getDirInfo
