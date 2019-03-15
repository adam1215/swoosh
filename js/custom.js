var startPicker = "";
var endPicker = "";
var totalPrice = 0;
const picker = datepicker('#from', {
    id: 1,
    formatter: (input, date, instance) => {
        const fromValue = date.toLocaleDateString()
        input.value = fromValue; // => '1/1/2099'
        startPicker = fromValue;
        calculate();
    },
    onSelect: (instance, selectedDate) => {
        instance.setMin(selectedDate);
    },
});

const end = datepicker('#to', {
    id: 1,
    formatter: (input, date, instance) => {
        const toValue = date.toLocaleDateString()
        input.value = toValue; // => '1/1/2099'
        endPicker = toValue;
        calculate();
    }
});

function calculate() {
    var diff = 0;
    if (totalPrice === 0 && startPicker && endPicker) {
        diff = Math.floor((new Date(endPicker).getTime() - new Date(startPicker).getTime()) / 86400000); // ms per day
        let totalDays = diff;
        totalPrice = totalDays * 150;
        console.log(totalPrice);
    }
    else {
        totalPrice = 0;
        calculate();
    }
}

//autocomplete//
jQuery(function () {
    jQuery("#travelCity").autocomplete({
        source: function (request, response) {
            jQuery.getJSON(
                "http://gd.geobytes.com/AutoCompleteCity?callback=?&q=" + request.term,
                function (data) {
                    response(data);
                }
            );
        },
        minLength: 3,
    });
    jQuery("#travelCity").autocomplete("option", "delay", 10);
});

function estimateCost() {
    //surcharge
    let travelCity = document.getElementById('travelCity');
    let selectedTravelCity = travelCity.value;

    if (selectedTravelCity.indexOf('San Francisco, CA, United States') || selectedTravelCity.indexOf('Los Angeles, CA, United States')) {
        totalPrice = totalPrice += 200;
    }
    console.log(totalPrice);

    // //per day
    // let day = document.getElementsByName('day');

    // for (i = 0; i < day.length; i++) {
    //     if (day[i].selected === true) {
    //         totalPrice += 150 * day[i].value;
    //         console.log(totalPrice)
    //     }
    // }

    //first class
    let firstClass = document.getElementById('firstClass');

    if (firstClass.checked) {
        totalPrice = totalPrice += 500;
    }
    console.log(totalPrice);

    //spouse
    let spouse = document.getElementById('addSpouse');

    if (spouse.checked) {
        totalPrice = totalPrice * 2;
    }
    console.log(totalPrice);

    let flightTotal = document.getElementById('flightTotal');
    return flightTotal.innerHTML = 'Your estimated cost for this trip is: $' + totalPrice;
}



