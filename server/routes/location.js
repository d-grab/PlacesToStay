const express = require('express');
const locationRouter = express.Router();
const login = require('../controllers/isLogged')

// include database connection
const db = require('../middleware/dbConnection'); 

const locationController = require('../DAOs/controller'); 
// Create the controller object, and pass in the database connection as an argument
const sController = new locationController(db);

// routes to find accommodations
locationRouter.get('/location/:location', sController.findlocationById.bind(sController)); // /location?location=colorado
locationRouter.get('/location/:location/type/:type',sController.findByType.bind(sController));


//route to make a booking 
locationRouter.post('/accommodation',login,sController.newAccommodation2.bind(sController)); // POST








// /location/(:any) -> places.php?method=findlocationById&location=colorado
//locationRouter.get('/location',userControler.allhotels) // get request to show all accommodation
//locationRouter.post('/accommodation/:accId/:npeople/:thedate/:username',sController.newAccommodation.bind(sController)); // GET
//router.route('/:type/:location')
//.get(userControler.FindByTypeAndLocation) //get request to show accommodation by type and location

//router.route('/accommodation/:accID?/:npeople?/:thedate?') // post request to make a reservetion for the accommodation
       //.post(userControler.FindByAccommodationId)

// handle get requests to route /course/:course using the controller's findStudentByCourse() method
//studentRouter.get('/course/:course', sController.findStudentByCourse.bind(sController));

// handle post requests to /create using the controller's addStudent() method
//studentRouter.post('/create', sController.addStudent.bind(sController));

module.exports = locationRouter; // so that main application can use it