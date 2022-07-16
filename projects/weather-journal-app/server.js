// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = '8083';
function listener(){
    console.log(`Example app running on http://localhost:${port}`);
}
const server = app.listen(port, listener);

app.post('/newEntry', (req, res) => {
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['userFeelings'] = req.body.userFeelings;
    projectData['description'] = req.body.description;
    projectData['condition'] = req.body.condition;

    res.send(projectData);
})

app.get('/updatedData', (req, res) => {
    res.send(projectData);
    console.log('Data sent to a client side');
})