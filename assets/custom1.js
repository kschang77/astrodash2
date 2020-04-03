//////////////////////////////////////
//Birthday Bountdown
//////////////////////////////////////

function timerSet(date) {
  // Get current day
  var currentDay = moment().format("YYYY-MM-DD");
  console.log(currentDay);
  currentDay = currentDay.split("-");
  console.log("Current Day: ");
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

/////////////////////////////////////////////////////////////////////
// Background Shuffle
var totalCount = 8;
function ChangeIt() {
  var num = Math.ceil(Math.random() * totalCount);
  document.body.background = "assets/images/bg" + num + ".jpg";
  document.body.style.backgroundRepeat = "repeat"; // Background repeat
}

/////////////////////////////////////////////////////////////////////
// Local Storage
var monthInput = document.querySelector("#month");
var dayInput = document.querySelector("#day");
var yearInput = document.querySelector("#year");
var cityInput = document.querySelector("#city");
var StateInput = document.querySelector("#state");
var signUpButton = document.querySelector("#sign-up");
// var userDaySpan = document.querySelector("#user-day");

// var userEmailSpan = document.querySelector("#user-email");
// var userPasswordSpan = document.querySelector("#user-password");

var msgDiv = document.querySelector("#msg");

// renderLastRegistered();

function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
}

// function renderLastRegistered() {
//   var email = localStorage.getItem("email");
//   var password = localStorage.getItem("password");

//   if (email && password === null) {
//     return;
//   }

//   userEmailSpan.textContent = email;
//   userPasswordSpan.textContent = password;
// }

signUpButton.addEventListener("click", function(event) {
  event.preventDefault();

  //   var email = document.querySelector("#email").value;
  //   var password = document.querySelector("#password").value;

  if (day === "") {
    displayMessage("error", "Sorry, day cannot be blank");
  } else if (month === "") {
    displayMessage("error", "Sorry, month cannot be blank");
  } else if (year === "") {
    displayMessage("error", "Sorry, year cannot be blank");
  } else if (city === "") {
    displayMessage("error", "Sorry, city cannot be blank");
  } else if (state === "") {
    displayMessage("error", "Sorry, state cannot be blank");
  } else {
    displayMessage("success", "Setup Successful");

    localStorage.setItem("day", day);
    localStorage.setItem("month", month);
    localStorage.setItem("year", year);
    localStorage.setItem("city", city);
    localStorage.setItem("state", state);
  }
});
