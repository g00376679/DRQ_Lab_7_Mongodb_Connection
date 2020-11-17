// Server Setup local host 4000 
const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');//add mongoose 

//To avoid cors error 
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//our server connecting with database
const myConnectionString  = 'mongodb+srv://admin:A1234dil@cluster0.xvk7v.mongodb.net/movies?retryWrites=true&w=majority';
//conneting with mogooes
mongoose.connect(myConnectionString, {useNewUrlParser: true});

const Schema = mongoose.Schema;

var movieSchema = new Schema({
    title:String,
    year:String,
    poster:String,
});


var MovieModel = mongoose.model("movie", movieSchema);


//Routing point
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Routing point 2 Movies passing down to server
app.get('/api/movies', (req, res) => {

    // const mymovies = [
    //     {
    //         "Title": "Avengers: Infinity War",
    //         "Year": "2018",
    //         "imdbID": "tt4154756",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    //     },
    //     {
    //         "Title": "Captain America: Civil War",
    //         "Year": "2016",
    //         "imdbID": "tt3498820",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    //     },

    // ]
//for looking a specific movie
MovieModel.find((err, data) =>{
    res.json(data);
})

    //Passing object mymovies and ok message
    // res.status(200).json({
    //     message: "Everything is ok",
    //     movies: mymovies
    // });
})

//for search movie by id
app.get('/api/movies/:id', (req,res)=>{
    console.log(req.params.id);


    MovieModel.findById(req.params.id, (err, data) =>{
        res.json(data);
    })
})
//Routing point listening for post request and it will pull title , year and poster out of the body
app.post('/api/movies', (req, res) => {
    console.log('Movie Received!');
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);

    MovieModel.create({
        title:req.body.title,
        year:req.body.year,
        poster:req.body.poster,
    })
    res.send('Item Added');

})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
