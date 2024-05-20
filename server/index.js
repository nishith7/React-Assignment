const data = require('./data')
const cors = require('cors');
const express = require('express')

const app = express()
app.use(cors());
const port = 4000

app.get('/getData', (req, res) => {
  res.send(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})