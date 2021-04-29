const express = require('express');
const { request } = require('http');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.listen(port, function(err){
    if(err)
    {
        console.log('Error on port 8000', err);
        return;
    }
});