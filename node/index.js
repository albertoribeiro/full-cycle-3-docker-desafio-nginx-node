const express = require('express')
const mysql = require('mysql')
const util = require('util');
var random_name = require('node-random-name');


const app = express()
const port = 3000
const config = {
  host:'db',
  user:'root',
  password:'root',
  database:'nodedb'
}
const conn = mysql.createConnection(config)
const query = util.promisify(conn.query).bind(conn);
 
app.get('/',  async (req,res)  =>  {

  try {
    await insertPerson() 
    const rows = await listPeople()

    let tablePeoples = '<ul>'
    
    for(let row of rows) {  
      tablePeoples += `<li> ${row.name} </li>`;
    }
  
    tablePeoples += '</ul>';
  
    res.send('<h1>Full Cycle Rocks! </h1><br/>'+ tablePeoples)
  } catch(err) {
    res.send('<h1>Full Cycle Rocks! </h1><br/>'+ err)
  }
 
})
 
async function insertPerson(){
  try {
    await query(`Insert into people (name) values ('${random_name()}') `);
  } catch(err) {
    console.log(`erro ao inserir pessoa. ${err}`);
  }
}

async function listPeople(){
  try {
    const rows = await query(`SELECT id, name FROM people`);
    return rows
  } catch(err) {
    console.log(`erro ao selecionar pessoas. ${err}`);
  }
}

app.listen(port,() => {
  console.log(`Rodando na porta ${port}.`)
})

 