const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('home')
})

app.get('/newpost', (req, res)=>{
    res.render('post')
})



app.listen(3000, ()=>{
    console.log('Server now running on port 3000');
})