const connectToMongoose = require("./db");
require('dotenv').config();

const express = require('express')

connectToMongoose();
var cors = require('cors')
var app = express()

app.use(cors())
const port = process.env.port;

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/club', require('./routes/stud'));
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
