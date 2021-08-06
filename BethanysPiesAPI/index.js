let express = require('express') //brings in express server and allows for the creation of an application
let app = express() //this is the creation of an application using express
let pieRepo = require('./repos/pieRepo')
let router = express.Router() //routes endpoints to things

// let pies = pieRepo.get() //gets the pieRepo and all of its data setting it to the array of pies so that our code is cleaner by keeping the data in a separate module

router.get('/', function(req, res, next) {
  pieRepo.get(function (data) {
  res.status(200).json({
    "status": 200,
    "statusText": "OK",
    "message": "All pies retrieved.",
    "data": data
  })
}, function(err) {
  next(err)
  })
}) //this is the function that gets the pie data from the pies.json file. it takes in a request, sends a response and the next is catching any errors and sending them to the console or for the user to see. 

router.get('/search', function (req, res, next) {
  let searchObject = {
    "id": req.query.id,
    "name": req.query.name
  }

  pieRepo.search(searchObject, function (data) {
    res.status(200).json({
      "status": 200,
      "statusText": "OK",
      "message": "All pies retrieved",
      "data": data
    })
  }, function (err) {
    next(err)
  })
})

router.get('/:id', function(req, res, next) {
  pieRepo.getById(req.params.id, function (data) {
    if(data) {
      res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "Single pie retrieved",
        "data": data
      })
    }
    else {
      res.status(404).json({
        "status": 404,
        "statusText": "Not Found",
        "message": "The pie '" + req.params.id + "' could not be found.",
        "error" : {
          "code": "NOT_FOUND",
          "message": "The pie '" + req.params.id + "' could not be found."
        }
      })
    }
  } , function () {
    next(err)
  })
})

//once someone makes a request to localhost5000/api/, this information is sent back. status letting them know that everything went okay, a message confirming that they received what they had requested and the data displaying the pies object
//the .json is to let the client know that they are receiving json data

//next is used for middleware error handling

app.use('/api/', router) //use is a function that says we want to add something

const server = app.listen(5000, function() {
  console.log('Node server is running on http://localhost:5000')
}) //sets the server location to be 5000, once someone goes to that url, the console is sent "node server is running on http://localhost:5000"



