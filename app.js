const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://0.0.0.0:27017/contactDance', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
    });
const port = 2143;

//DEFINE MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    message: String
});

const contactinfo = mongoose.model('contactinfo', contactSchema);

//EXPRESS STUFF
app.use('/static',express.static('static')); //for serving static file
app.use(express.urlencoded()); //helps form data to express

//PUG STUFF
app.set('view engine','pug'); //set the templete engine as pug
app.set('views', path.join(__dirname,'views'));  //set the view directory

//ENDPOINTS
app.get('/', (req, res)=>{
    res.status(200).render('index.pug');
});

app.post('/submit', (req, res)=>{
    var myData = new contactinfo(req.body);
    myData.save().then(()=>{
        res.send("data has been send succesfully.")
    }).catch((err)=>{
        res.send(err.message)
    });
});

//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application is listing on port ${port}`);
});