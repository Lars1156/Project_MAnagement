const express = require ('express');
const bodyParser = require('body-parser');
const {connection} = require('./connection');
const routerAPI = require('./routes/api');

const app = express();

// Database Connection 
connection('mongodb://localhost:27017/Project_Management').then(()=>{
    console.log("Database Connection Successfully");
}).catch((error)=>{
    console.log("Database connection Failed", error)
});

app.use(express.json());
app.use(bodyParser.json);
app.use('/api' , routerAPI); 

app.listen(8808, ()=>{
    console.log('Server is Running On the 8808');
    
})