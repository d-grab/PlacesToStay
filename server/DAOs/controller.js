const accommodationDao = require('./model'); 
const card_validator = require("card-validator");
class LocationController {
    constructor(db) {
        // Create a DAO for communicating with the database
        this.dao = new accommodationDao(db, "accommodation");
    }


    // calls the DAO's FindByLocation() method, passing the location parameter
    async findlocationById(req, res) {
        try {
            let location = await this.dao.FindByLocation(req.params.location);
            // promise resolves with null if there are no results
            if(location == null) {
                res.status(404).json({error: "No location with that ID"});
            } else {
                res.json(location);     }} 
        catch(e) {
                res.status(500).json({error: e});
                  }}

    async findByType(req, res) {
        try {
            // await for the result from the query
             const location = await this.dao.FindByTypeAndLocation(req.params.type,req.params.location);
             // if no result display error
             if(location == null) {
                res.status(404).json({error: "No location with that ID"});
            // if resolve , respons with json file with array of accommodations
            } else {
                res.json(location);    
            }
            //any other errors , status 500 (Internal Server Error)
        } catch(e) {
            res.status(500).json({error: e});
        }
    }

    async newAccommodation2(req, res) {
        
        var error = "";
        var accId = req.query.accId;
        var thedate = req.query.thedate;
        var npeople = req.query.npeople;
        var username = req.query.username;
        var card = req.query.card;
        if(!accId || accId == ""){ 
            error += "\n " + "You need to provide the accommodation Id";
        }
        if(!thedate || thedate == "" ){
            error += "\n" + "You need to provide the date" + "" ;
        }
        if(!npeople || npeople == ""){
            error += "\n" + "You need to provide number of people";
        }
        if(!username || username == ""){
            error += "\n" +"You need to provide a username";
        }
        if(!card || card == ""){
           error += "\n" +"You need to provide a card number";
        }

        // check if any error
        if(error != ""){
            console.log("Errors");
            res.json({msg: error});
        }
        else{
            console.log("No Errors");
            try {
            
                 if (card == null || !card_validator.number(card).isValid) {
                    res.json({msg: "The card number is invalid"})
                }
                 else {

                // method to retrieve number of people for choosen accommodation on a given date 
                // to perform a validations
                const number_of_people = await this.dao.numberOfPeople(accId,thedate);
                if(number_of_people == null ){
                    res.json({msg: "That date is not available, please choose other date"})
                }else {
                    if(number_of_people.availability == 0) {
                        res.json({msg: `There is no more availibility for this place on that date, try the next day date`}) }
                    else{
                        if(number_of_people.availability >= npeople && number_of_people.thedate == thedate ){
                // Place a booking method
                            const acc_Id = await this.dao.bookAccommodation(accId,thedate,npeople,username);
                // Calling AccomodationDetails method to get acccomodation name and passed as a message
                            let acc = await this.dao.getAccomodationDetails(acc_Id);
                          
                            res.json({msg: `You booked a room in "${acc[0].name} "`});}
                else{
                    res.json({msg: `Maximum availibility is "${number_of_people.availability} "`});    
                }}}
            }} catch(e) {  
                res.json({msg: e});
            } } }

}

module.exports = LocationController; // router can use it