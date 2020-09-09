// Empty JS object to act as endpoint for all routes including as the API endpoint
let projectData = {};

// Express package to run the server and its routes
const express = require ("express");

// Initiate an instance of app
const app = express();

// Dependencies - Middleware
const bodyParser = require ("body-parser");

// Middleware - connect to the app instance
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cross origin allowance
const cors = require("cors");
app.use(cors());

// Direct my app to connect the server-side code to my main project folder AKA my client-side code
app.use(express.static("website"));

// Creat local server
const port = 8000;

const server = app.listen (port, () => {
    console.log(`Server is running on localhost:${port}`);
});

// GET route:
// Respond with JS object when a GET route request is made to the homepage
// "/all" so that the route triggers the GET request and returns the JS object
app.get("/all", sendData);

function sendData (request, response) {
    response.send(projectData);
    console.log(projectData);
}

// POST Route:
// First argument created is the URL I want to use and creat an API to add infos about the weather

app.post('/add', addData);

function addData (request, response) {
    let data = request.body;

    console.log("POST received ", data);
    
    projectData["date"] = data.date;
    projectData["temp"] = data.temp;
    projectData["content"] = data.content;

    // Sends response to endpoint object
    response.send(projectData);
}
