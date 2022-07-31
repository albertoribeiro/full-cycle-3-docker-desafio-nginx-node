const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
const config = {
  host:'db',
  user:'root',
  password:'root',
  database:'nodedb'
}
const connection = mysql.createConnection(config)

app.use(express.json());

app.post('/', (req,res) => {

  try {
    const sql = `Insert into people (name) values ('${req.body.name}') `
    connection.query(sql)

    res.send(` <h1> INSERIU !!!  </h1> \n <h1>  ${sql}</h1>  `)
  } catch (error) {
    res.send(` <h1> Deu Erro  </h1> \n <h1>  ${error}</h1>  `)
  }
})

app.listen(port,() => {
  console.log(`Rodando na porta ${port}.`)
})

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated')
    connection.end()
  })
})
