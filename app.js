const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactGym');
}
const app = express();
const port = 8000;

app.use(express.static('public')) // For serving static files
app.use(express.urlencoded({extended: true}));

const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    locality: String,
  });

const Contact = mongoose.model('Contact', contactSchema);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
});

app.post('/',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.sendFile(path.join(__dirname,'public/index.html'));
    }).catch(()=>{
        res.status(400).send("The item was not able to save to the database");
    });
});

app.listen(port,()=>{
    console.log(`Running on server with port ${port}`);
 });