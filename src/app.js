const express = require('express')
const multiparty = require('multiparty')
const util = require('util')
const fs = require('fs')
const path = require('path')
const getDirInfo = require('./getDirInfo')

const app = express()
const port = process.env.PORT || 3000
const staticDir = path.resolve(__dirname, '../files')

app.use(express.static('src'))
app.use(express.static('files'))

app.get('/', (req, res) => {
  res.redirect('/')
})

app.get('/files', async (req, res) => {
  const data = await getDirInfo(staticDir)
  res.json(data)
})

app.post('/upload', (req, res) => {
  var options = {
    uploadDir: staticDir,
    autoFields: true,
    autoFiles: true
  }
  var form = new multiparty.Form(options)

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(400, {
        'content-type': 'text/plain'
      })
      res.end('invalid request: ' + err.message)
      return
    }
    res.writeHead(200, {
      'content-type': 'text/plain'
    })

    const fileList = Object.values(files)
    if (fileList.length == 0) {
      res.end('Not received files:\n\n ' + util.inspect(files))
      return
    }
    var currentFile = Object.values(files)[0][0]

    fs.renameSync(
      currentFile.path,
      path.join(form.uploadDir, currentFile.originalFilename),
      null
    )
    res.end('Received files:\n\n ' + util.inspect(currentFile.originalFilename))
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
