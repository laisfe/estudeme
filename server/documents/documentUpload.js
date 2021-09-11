const fs = require('fs')
const path = require('path')

module.exports = (pathFile, documentName, callbackDocumentCreated) => {
  const type = path.extname(pathFile)
  const newPath = `./documentsFiles/${documentName}${type}`

  fs.createReadStream(pathFile)
    .pipe(fs.createWriteStream(newPath))
    .on('finish', () => callbackDocumentCreated(newPath))
}