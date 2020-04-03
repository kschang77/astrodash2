//////////////////////////////////////
//Birthday Bountdown 
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


/////////////////////////////////////////////////////////////////////
// Background Shuffle
var totalCount = 8;
function ChangeIt() 
{
var num = Math.ceil( Math.random() * totalCount );
document.body.background = 'assets/images/bg'+num+'.jpg';
document.body.style.backgroundRepeat = "repeat";// Background repeat
}


/////////////////////////////////////////////////////////////////////
// Background Shuffle
