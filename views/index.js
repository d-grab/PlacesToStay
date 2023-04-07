
// Handle button clicks on the search button
document.getElementById("find").addEventListener("click", e=> {
     


// Read in the location from the form field
    const location = document.getElementById("ht_location").value;
    
    //Calling search function and passing location from the search field 
    ajaxSearch(location);
    
});
document.getElementById("find");
    var map = L.map('map').setView([0, 0], 1);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 20,
attribution: '© FIND YOUR ROOM'
}).addTo(map);

async function ajaxSearch(location) {

    // Send a fetch request to the location route on this server, passing the
    // location as a parameter
    const ajaxResponse = await fetch(`/location/${location}`);

    // Parse the JSON
    const Booking = await ajaxResponse.json();
    document.getElementById("ht_results").innerHTML="";
    //getting username Details from the hidden field
    const username = document.getElementById("map-container").value;
    //Creating counter for the table
    var count = 0;
    // Top part of the table
    $("#ht_results").append(`<table class="table " >
        <thead>
          <tr>
            <th scope="col" width="50">ID</th>
            <th scope="col" width="300">Name</th>
            <th scope="col" width="340">Type</th>
            <th scope="col" width="350">Latitude</th>
            <th scope="col" width="350">Longitude</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        </table>`)

    // Using forEach function for all records in the location from the database
    Booking.forEach( place => {
    //Increamenting counter
        count++;
       
        
        // Assigning location parameters for the map position
        const lat=place.latitude;
        const lon=place.longitude;
        const pos = [lat,lon];
        // Form for booking 
        var html = `
            <form method="post" enctype="multipart/form-data" action="/upload">
                <input type="file" name="image"/>
                <input type="submit" value="Submit">
            </form>
            <div class="card" style="width: 18rem;">
            <img src="./images/340b555882e545056dcbdf4178c4387c.jpg" class="card-img-top" alt="...">
            
            <div class="card-body">
                <h5 class="card-title">Accomodation name - ${place.name} </h5>
                <p class="card-text">${place.description}</p>
                <form>
                    <div class='form-group row'>
                        <div class='col-md-4'><label for='thedate_${place.ID}'>Date</label></div>
                        <div class='col-md-8'><input type='date' name='thedate' id='thedate_${place.ID}' class='form-control' value='2022-06-01' ></div>
                    </div>
                    <div class='form-group row'>
                        <div class='col-md-4'><label for='npeople_${place.ID}'>People</label></div>
                        <div class='col-md-8'><input type='number' name='npeople' id='npeople_${place.ID}' class='form-control' min='1' ></div>
                    </div>
                    <div class="form-group row">
                        <div class='col-md-4'><label for="card">Credit Card Number</label></div>
                        <div class='col-md-8'><input type="text" name=card class="form-control" id="card_${place.ID}" maxlength='16' value="5555555555554444" required></div>
                        <div id="card_error" class="mt-1 error-msg"></div>
                    </div>
                    <div class='form-group row'>
                        <div class='col-md-12'>
                            <input type='hidden' name='username' id='username_${place.ID}' value='${username}'>
                            <button type='button' data-accId='${place.ID}' class="btn btn-primary booking_button">Book Now</button>
                            <div id="msg_${place.ID}"></div>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        </div>
        `;
        //Adding possitions to the map and form to the Popup window 
        L.marker(pos).addTo(map).bindPopup(html);
        map.setView(pos, 10);


        // Displaying each accommodation for the location in the table , with booking button
        $("#ht_results").append(`<table class="table table-sm" >
        <tbody>
          <tr>
            <td >${count}</td>
            <td width="300">${place.name}</td>
            <td width="350">${place.type}</td>
            <td width="350">${place.latitude}</td>
            <td width="350">${place.longitude}</td>
            <td >${place.description}</td>
            <td><button type='button' id='order_${place.ID}' class="btn btn-primary ">Book Now</button></td>
          </tr>
        </tbody>
      </table>`)
        

        
        // Add event handler to the button for the First task
        const order = document.getElementById(`order_${place.ID}`);
        
        order.addEventListener("click", async(e) => {
            // Send an AJAX post  
            // Passing parameters for the API
            const ajaxResponse2 = await fetch(`/accommodation?accId=${place.ID}&username=${username}&npeople=2&thedate=220601&card=5555555555554444`, {
                method: 'POST'   });
            
                if(ajaxResponse2.status == 200) {
                    const json = await ajaxResponse2.json();
                    console.log(json);
                    alert(`${json.msg}`);
                } 
            });  
            
    });

    
   
}
// Using jqUery for ajax request, and assigning all values from the booking form. Each of the inputs has unique ID to identify
//for what accommodation user would like to make a booking
$(document).ready(function (){
    $(document).on('click', ".booking_button", function(e) {
        const accId = $(this).attr('data-accId');
        const rawdate = $('#thedate_'+accId).val().replaceAll('-', '');
        const thedate = rawdate.substr(2,6);
        const npeople = $('#npeople_'+accId).val();
        const username = $('#username_'+accId).val();
        const card = $('#card_'+accId).val();

        $.ajax({
            url: `/accommodation?accId=${accId}&username=${username}&npeople=${npeople}&thedate=${thedate}&card=${card}`,
            method: 'POST',
            type: 'JSON',
            success: function(res){
                alert(res.msg); 
            }
        });
    })
});


/**
 * 1. Make an onchange (thedate) event listener
 * 2. Do an Ajax call to controller - use same model method
 * 3. Retrurn the availability from that controller
 * 4. Change max attribute of the nopeople in the form
 * 
 * MVP - Minimum Viable Product
 * MVS - Solution
 */