const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

let tasks_data = [];

//simple get route
app.get('/', (req, res) => {
  res.send('Hello ,your get request!');
});

//get route that retuns all the data send from post req  and handles err
app.get('/all', (req, res,next) => {
  try{

  res.status(200).send(tasks_data);
  }
  catch(err){
    err.status =500;
    next(err);
  }
});

//Post route  with payload vlidation
app.post('/',(req, res, next) => {
  const {name, email  } = req.body;

  //Checking that the name and email are present 

  if(!name  || !email){
    const err = new Error('Name and email are required');
    err.status =400;
    return next(err);
  }
   //ADD the data to array

   tasks_data.push({name, email});
  //sending the response 

  res.status(200).send(`Received name : ${name}, email: ${email}`);
});

// error handlers
app.use((err,req,res,next) => {
  res.status(err.status || 500);
  res.send({
    error:{
      message: err.message
    }
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


  
  
  



