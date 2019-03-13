function estimateCost(){
    totalPrice = 0;

    // //passport notification
    // let nationality = document.getElementById('nationality');
    // let selectNationality = nationality.value;

    // if (selectNationality === 'usa' || selectNationality === 'canada') {
    //     alert ('You do not require a passport for this trip!');
    // }  else {
    //     alert ('You do require a passport for this trip!');
    // }

    //surcharge
    let travelCity = document.getElementById('travelCity');
    let selectedTravelCity = travelCity.value;

    if (selectedTravelCity.indexOf('San Francisco, CA, United States') || selectedTravelCity.indexOf('Los Angeles, CA, United States')) {
        totalPrice = totalPrice += 200;
    } 
    console.log(totalPrice);

    //per day
    let day = document.getElementsByName('day');

    for (i = 0;i < day.length; i++) {
        if (day[i].selected === true) {            
            totalPrice = 150 * day[i].value;
            console.log(totalPrice)
        }
    }

    let flightTotal = document.getElementById('flightTotal');
    return flightTotal.innerHTML = 'Your estimated cost for this trip is: $' + totalPrice;


    // //first class
    // let firstClass = document.getElementById('firstClass');

    // if (firstClass.checked) {
    //     totalPrice = totalPrice += 500;
    // }
    // console.log(totalPrice);
    
    // //spouse
    // let spouse = document.getElementById('addSpouse');

    // if (spouse.checked) {
    //     totalPrice = totalPrice * 2;
    // }
    // console.log(totalPrice);
}
/*autocomplete*/

jQuery(function () 
 {
	 jQuery("#travelCity").autocomplete({
		source: function (request, response) {
		 jQuery.getJSON(
			"http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+request.term,
			function (data) {
			 response(data);
			}
		 );
		},
		minLength: 3,
	 });
	 jQuery("#travelCity").autocomplete("option", "delay", 10);
    });

