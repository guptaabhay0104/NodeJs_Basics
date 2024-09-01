const { log } = require('console')
const express = require('express')
const MenuItem = require('./models/MenuItem')
const Person = require('./models/Person')
const app = express()
const db = require('./db') 

//Importing and using body-parser to carefully manage the data coming from different sources before saving them in into the database
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body - stores the body data post parsing

app.get('/', function(req, res){
  res.send('Server is running')
})


// Importing and Using the different Routes present in our apllication
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

const menuRoutes = require('./routes/menuItemRoutes')
app.use('/menu-items', menuRoutes)

app.listen(3000, () => {
  console.log('listening on port 3000');
  
})