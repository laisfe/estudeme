const customExpress = require('../config/customExpress')
const connection = require('../infra/connection')
const Tables = require('../infra/tables')

connection.connect(error => {
  if (error) {
    console.log(error)
  } else {
    console.log('conectado com sucesso')

    Tables.init(connection)

    const app = customExpress();

    app.listen(8000, () => {
      console.log('Servidor porta 8000');
    })
  }
})

