const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000;

//middleware
app.use(cors()) // to send request from frontend to server
app.use(express.json());   //to help handle json data on server site

app.get('/', (req, res) => {
  res.send('simple crud sever is running!')
})

//simpleDBUser
//WyFdIoiI8ckV9wvE

app.listen(port, () => {
  console.log(`simple crud server is running  on port ${port}`)
})