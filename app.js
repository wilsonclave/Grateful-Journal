const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
const { entries } = require('lodash');


const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/gratefulDB", { useNewUrlParser: true, useUnifiedTopology: true });

const entrySchema = {
    entry1: String,
    entry2: String,
    entry3: String,
    entry4: String
}

const Entry = mongoose.model('Entry', entrySchema)


app.get('/', (req, res)=>{
    
    Entry.find({}, (err, foundItems)=>{
        foundItems.sort((a,b)=>b.entry4 > a.entry4 ? 1 : -1)
        console.log(foundItems);
        res.render('home', {entries: foundItems}) 
    })
    
})

app.get('/compose', (req, res)=>{
    res.render('compose')
})

app.post('/', (req, res)=>{
    const entryOne = req.body.entry1;
    const entryTwo = req.body.entry2;
    const entryThree = req.body.entry3;
    const entryFour = req.body.entry4;

    const newEntry1 = new Entry ({
        entry1: entryOne,
        entry2: entryTwo,
        entry3: entryThree,
        entry4: entryFour
    })

    newEntry1.save();
    res.redirect('/');

})

app.listen(3000, ()=>{
    console.log('Server now running on port 3000');
})