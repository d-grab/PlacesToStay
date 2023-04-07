var conn = require('../middleware/dbConnection')

class accommodationDao {
    // conn is database connection
    // table storing accommodations
    constructor(conn, table) {
        this.conn = conn;
        this.table = table;
       }


    // find by location

    FindByLocation(location) {
        return new Promise ( (resolve, reject) => {
            this.conn.query(`SELECT * FROM ${this.table} WHERE location=?`, [location],
                (err, results, fields) => {
                    if(err) {
                        reject(err);
                    } else if (results.length == 0) {
                        // resolve with null if no results - this is not considered an error, so we do not reject
                        resolve(null); 
                    } else {
                        resolve(results);
                    }
                });
        });
    }
                            

    // find by type and location
    FindByTypeAndLocation(type,location) {
        return new Promise ( (resolve, reject) => {
            this.conn.query(`SELECT *FROM ${this.table} WHERE type=? AND location=?`, [type,location],
                (err, results, fields) => {
                    if(err) {
                        reject(err);
                    } else if (results.length == 0) {
                        // resolve with null if no results 
                        resolve(null); 
                    } else {
                        resolve(results);
                    }
                });
        });
    }


    bookAccommodation(accID,thedate,npeople,username) {
        //console.log("Inside the model" + accID);
        return new Promise ( (resolve, reject) => {
            this.conn.query(`INSERT INTO acc_bookings(accID,thedate,npeople,username) VALUES (?,?,?,?)`, [accID,thedate,npeople,username],
                (err, results, fields) => {
                    if(err) {
                        reject(err);
                    } else {
        // If no error , remove availability = number of people for accID (location)  
        // and thedate provided by the user
                        this.conn.query(`UPDATE acc_dates SET availability=availability-${npeople} WHERE accID=? AND thedate=?`,
                        [accID,thedate]);
        // resolve with the record's allocated ID
                        resolve(accID); 
                    }
                });
        });
    }
    
    numberOfPeople(accID,thedate) {
        //console.log("Inside the model" + accID);
        return new Promise ( (resolve, reject) => {
            this.conn.query(`SELECT * FROM acc_dates WHERE thedate=? AND accID=?`, [thedate, accID],
                (err, results, fields) => {
                    if(err) {
                        reject(err);
                    } else if (results.length == 0) {
                        // resolve with null if no results - this is not considered an error, so we do not reject
                        resolve(null); 
                    }
                    else {
                        resolve(results[0]); // resolve with the record's allocated ID
                    }
                });
        });
    }

    getAccomodationDetails(accID) {
        //console.log("Inside the model" + accID);
        return new Promise ( (resolve, reject) => {
            this.conn.query(`SELECT * FROM accommodation WHERE ID=?`, [accID],
                (err, results, fields) => {
                    //console.log(results);
                    resolve(results);
                });
        });
    }

}

module.exports = accommodationDao; // so that other code can use it