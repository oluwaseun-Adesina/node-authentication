const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');  
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const app = express();
const port = 3000;

// middleware
app.use(express.static('public'));
app.use(express.json()); 
app.use(cookieParser());

//view engine
app.set('view engine', 'ejs');

//database
const dbURI = "mongodb://0.0.0.0:27017/auth" 
//const dbURI1 = "mongodb://0.0.0.0:27017/authreadPreference=primary&ssl=false"

mongoose.connect(dbURI, {useUnifiedTopology: true, useNewUrlParser: true})
    .then((result) => app.listen(port), ()=>{
        console.log('Server Listening on https://localhost:'+port,'\n', 'connection to local database has been made')
    })
    .catch((error) => console.log(error));

//routes 
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

app.use(authRoute)

 