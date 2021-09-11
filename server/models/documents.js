const moment = require('moment')
const connection = require('../infra/connection')
const documentUpload = require('../documents/documentUpload')

class Documents {
  add(doc, res, fileName) {
    const date = moment().format('YYYY-MM-DD HH:mm:ss')
    const actualDate = { ...doc, date }

    const sql = 'INSERT INTO Documents SET ?'

    documentUpload(doc.file, doc.documentName, newPath => {
      const newDocument = { documentName: doc.documentName, file: newPath, date: date }
      connection.query(sql, newDocument, (error, results) => {
        if (error) {
          console.log(error)
          res.status(400).json(error)
        } else {
          console.log(results)
          res.status(201).json(newDocument)
        }
      })
    })
  }

  list(res) {
    const sql = 'SELECT * FROM Documents'

    connection.query(sql, (error, results) => {
      if (error) {
        res.status(400).json(error)
      } else {
        res.status(200).json(results)
      }
    })
  }

  searchById(id, res) {
    const sql = `SELECT * FROM Documents WHERE id=${id}`
    connection.query(sql, (error, results) => {
      const document = results[0]
      if (error) {
        res.status(400).json(error)
      } else {
        res.status(200).json(document)
      }
    })
  }
}

module.exports = new Documents()