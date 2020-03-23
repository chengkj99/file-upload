const express = require('express')
const multiparty = require('multiparty');
const util = require('util')
const fs = require('fs')
const path = require('path')

const app = express()
const port = 3000

app.post('/upload', function (req, res) {
  var options = {
    uploadDir: './files',
    autoFields: true,
    autoFiles: true
  }
  var form = new multiparty.Form(options);

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(400, {
        'content-type': 'text/plain'
      })
      res.end('invalid request: ' + err.message)
      return;
    }
    res.writeHead(200, {
      'content-type': 'text/plain'
    })

    const fileList = Object.values(files);
    if (fileList.length == 0) {
      res.end('Not received files:\n\n ' + util.inspect(files));
      return
    }
    var currentFile = Object.values(files)[0][0];

    fs.renameSync(currentFile.path, path.join(form.uploadDir, currentFile.originalFilename), null);
    res.end('Received files:\n\n ' + util.inspect(files));
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
