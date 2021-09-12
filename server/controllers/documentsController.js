const Documents = require('../models/documentsModel')
const multipart = require('connect-multiparty');
const fs = require('fs')

module.exports = app => {
  app.get('/documents', (req, res) => {
    Documents.list(res)
  })

  app.get('/documents/:id', (req, res) => {
    const id = parseInt(req.params.id)

    Documents.searchById(id, res)
  })

  const multipartMiddleware = multipart({ uploadDir: './documentsFiles' });
  app.post('/documents', multipartMiddleware, (req, res) => {
    const files = req.files
    const path = files.file.path.split('\\')
    const pathSplitted = './' + `${path[0]}` + '/' + `${path[1]}`
    const document = {
      file: `./documentsFiles/${files.file.path.substring(15)}`,
      documentName: files.file.originalFilename.split('.')[0]
    }
    Documents.add(document, res)
    fs.unlinkSync(pathSplitted)
  })
}