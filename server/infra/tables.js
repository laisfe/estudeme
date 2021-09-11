class Tables {
  init(connection) {
    this.connection = connection
    this.createDocuments()
  }
  createDocuments() {
    const sql = 'CREATE TABLE IF NOT EXISTS Documents (id int NOT NULL AUTO_INCREMENT, file varchar(200), documentName varchar(100), date datetime, PRIMARY KEY(id))'
    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log('Tabela documentos criada com sucesso')
      }
    })
  }
}

module.exports = new Tables