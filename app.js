const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoutes')

const app = express();
const port = 3000;

// middleware
app.use(express.static('public'));
app.use(express.json()); 

//view engine
app.set('view engine', 'ejs');

//database
const dbURI = "mongodb://0.0.0.0:27017/auth" 
const dbURI1 = "mongodb://0.0.0.0:27017/authreadPreference=primary&ssl=false"

mongoose.connect(dbURI, {useUnifiedTopology: true, useNewUrlParser: true})
    .then((result) => app.listen(port), ()=>{
        console.log('Server Listening on https://localhost:'+port,'\n', 'connection to local database has been made')
    })
    .catch((error) => console.log(error));

//routes 

app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.use(authRoute)


//cookies
app.get('/set-cookies', (req, res)=>{
    res.setHeader('set-cookie', 'newUser=true')
    res.send('you got the cookies')
});

app.get('/read-cookies', (req, res) =>{

}) 