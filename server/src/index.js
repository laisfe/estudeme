// const multipart = require('connect-multiparty');


// const multipartMiddleware = multipart({ uploadDir: './documents' });
// app.post('/documents', multipartMiddleware, (req, res) => {
//   const files = req.files;
//   console.log(files);
//   res.json({ message: files });
// })

// app.use((err, req, res, next) => res.json({ error: err.message }))

const customExpress = require('../config/customExpress')
const connection = require('../infra/connection')

connection.connect(error => {
  if (error) {
    console.log(error)
  } else {
    console.log('conectado com sucesso')
    
    const app = customExpress();

    app.listen(8000, () => {
      console.log('Servidor porta 8000');
    })
  }
})

