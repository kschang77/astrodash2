/////////////////////////////////////////////////////////////////////
// Local Storage
/////////////////////////////////////////////////////////////////////
window.onload = function(getData) {
var monthInput = document.querySelector("#month");
var dayInput = document.querySelector("#day");
var yearInput = document.querySelector("#year");
var cityInput = document.querySelector("#city");
var StateInput = document.querySelector("#state");
var signUpButton = document.querySelector("#sign-up");
var userDaySpan = document.querySelector("#user-day");
var userMonthSpan = document.querySelector("#user-month");
var userYearSpan = document.querySelector("#user-year");
var userCitySpan = document.querySelector("#user-city");
var userStateSpan = document.querySelector("#user-state");



signUpButton.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("test1")

    var month = document.querySelector("#month").value;
    var day = document.querySelector("#day").value;
    var year = document.querySelector("#year").value;
    var city = document.querySelector("#city").value;
    var state = document.querySelector("#state").value;


    if (day === "") {
        displayMessage("error", "Sorry, day cannot be blank");
    }
    else if (month === "") {
        displayMessage("error", "Sorry, month cannot be blank");
    }
    else if (year === "") {
        displayMessage("error", "Sorry, year cannot be blank");
    }
    else if (city === "") {
        displayMessage("error", "Sorry, city cannot be blank");
    }
    else if (state === "") {
        displayMessage("error", "Sorry, state cannot be blank");
    }
    else {

        localStorage.setItem("day", day);
        console.log(day);
        localStorage.setItem("month", month);
        console.log(month)
        localStorage.setItem("year", year);
        console.log(year)
        localStorage.setItem("city", city);
        console.log(city)
        localStorage.setItem("state", state);
        console.log(state)
    }

});


//////////////////////////////////////
//Birthday Countdown 
//////////////////////////////////////

function timerSet(date) {
    // Get current day
    var currentDay = moment().format("YYYY-MM-DD");
    console.log(currentDay);
    currentDay = currentDay.split("-");
    console.log("Current Day: ")
    console.log(currentDay);
    var yearCurrent = currentDay[0];
    var monthCurrent = currentDay[1];
    var dayCurrent = currentDay[2];
    // split data to change date
    date = date.split("-");
    var yearBday = date[0];
    var monthBday = date[1];
    var dayBday = date[2];
    var yearNextBday;
    // Bday month has not occured this year
    if (monthBday > monthCurrent) {
        yearNextBday = yearCurrent;
    }
    // Currently in bday month
    else if (monthBday === monthCurrent) {
        // Bday coming this month
        if (dayBday > dayCurrent) {
            yearNextBday = yearCurrent;
        }
        // Bday has occured this year or is today
        else {
            // Bday today
            if (dayBday === dayCurrent) {
                console.log("It's your bday");
                // alert it's your bday
            }
            // Countdown till next
            yearNextBday = parseInt(yearCurrent) + 1;
        }
    }
    // Bday month has already passed
    else {
        yearNextBday = parseInt(yearCurrent) + 1;
    }
    // Change bday year to next bday year
    date = yearNextBday + "-" + monthBday + "-" + dayBday;
    // console.log(date);
    date += "T00:00:00+00:00";
    console.log(date);
    $("#bday-countdown").attr("uk-countdown", "date: " + date);
    $("#bday-countdown").attr("style", "display:block");
}
};



/////////////////////////
//Quote
// https://theysaidso.com/api/#js
////////////////////////
// function get_quote_of_the_day() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
// 	 if (this.readyState == 4 && this.status == 200) {
// 	     // Access the result here
// 	     alert(this.responseText);
// 	 }
//     };
//     xhttp.open("GET", "https://quotes.rest/qod?category=inspire", true);
//     xhttp.setRequestHeader("Content-type", "application/json");
//     xhttp.setRequestHeader("X-Theysaidso-Api-Secret", "YOUR API HERE");
//     xhttp.send();
// }

// get_quote_of_the_day()


//////////////////////////
//Moon Phase
//http://www.wdisseny.com/lluna/?lang=en
/////////////////////////////////

// function load_moon_phases(obj){
// 	var gets=[]
// 	for (var i in obj){
// 		gets.push(i+"="+encodeURIComponent(obj[i]))
// 	}	
// 	var xmlhttp = new XMLHttpRequest()
// 	var url = "https://www.icalendar37.net/lunar/api/?"+gets.join("&")
// 	xmlhttp.onreadystatechange = function() {
// 		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
// 			var moon  = JSON.parse(xmlhttp.responseText)
// 			example_1(moon)
// 			example_2(moon)
// 			example_3(moon)	
// 		}
// 	}
// 	xmlhttp.open("GET", url, true)
// 	xmlhttp.send()
// }
// var d = new Date();
// var n = d.getMonth();

// document.addEventListener("DOMContentLoaded", function() { 
// 	var configMoon = {
// 		lang  		:'en', // 'ca' 'de' 'en' 'es' 'fr' 'it' 'pl' 'pt' 'ru' 'zh' (*)
// 		month 		:new Date().getMonth(), // 1  - 12
// 		year  		:new Date().getFullYear(),
// 		size		:50, //pixels
// 		lightColor	:"#FFFF88", //CSS color
// 		shadeColor	:"#111111", //CSS color
// 		sizeQuarter	:20, //pixels
// 		texturize	:false //true - false
// 	}
// 	configMoon.LDZ=new Date(configMoon.year,configMoon.month-1,1)/1000
// 	load_moon_phases(configMoon)
// })



/////////////////////////////////////////////////////////////////////
// Background Shuffle
// var totalCount = 8;
// function ChangeIt() {
//     var num = Math.ceil(Math.random() * totalCount);
//     document.body.background = 'assets/images/bg' + num + '.jpg';
//     document.body.style.backgroundRepeat = "repeat";// Background repeat
