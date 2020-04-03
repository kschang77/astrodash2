// Once document is loaded
var resp = "";
var bday, astrosign, czodiac, keyword, sentiment;

$(document).ready(function() {
  //   var horoscope = "";

  function saveInputtoLS() {
    // saves the various input fields to LocalStorage
    localStorage.setItem("day", $("#bday-day").val());
    localStorage.setItem("month", $("#bday-month").val());
    localStorage.setItem("year", $("#bday-year").val());
    localStorage.setItem("city", $("#city").val());
    localStorage.setItem("state", $("#state").val());
  }

  //birthday submit
  $("#setup-submit").on("click", function(event) {
    event.preventDefault();
    bday = moment(
      //   $("#bday").val()
      $("#bday-month").val() +
        "-" +
        $("#bday-day").val() +
        "-" +
        $("#bday-year").val(),
      "MM-DD-YYYY",
      true
    );

    if (!bday.isValid()) {
      alert("Date entered is not valid!");
    } else {
      console.log("bday = " + bday);

      saveInputtoLS();

      astrosign = getZodiac(bday);
      console.log("astrosign=" + astrosign);

      $(".horoscope1").text(astrosign);

      czodiac = chineseZodiac(bday);
      console.log("czodiac=" + czodiac);

      $(".horoscope2").text(czodiac);
      $("#horoscope2").text(" is your Chinese zodiac");

      getHoroscope(astrosign, getDataBoth);
      // resp now contains the horoscope
      $("#horoscope1").text(resp);

      // keyword now has the keyword from horoscope
      // sentiment now has sentiment from horoscope
      //
    }
  });

  function getZodiac(indate) {
    var tdate = moment(indate); // any date will be converted

    console.log(tdate.calendar());
    // console.log(tdate);
    var day = tdate.date();
    var month = tdate.month() + 1;

    console.log(month + " // " + day);

    // Capricorn - Dec 22 - Jan 19
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
      return (horoscope = "capricorn");
    }
    // Aquarius - Jan 20 - Feb 18
    else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
      return (horoscope = "aquarius");
    }
    // Pisces - Feb 19 - March 20
    else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
      return (horoscope = "pisces");
    }
    // Aries - March 21 - April 19
    else if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
      return (horoscope = "aries");
    }
    // Taurus - April 20 - May 20
    else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
      return (horoscope = "taurus");
    }
    // Gemini - May 21 - June 20
    else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
      return (horoscope = "gemini");
    }
    // Cancer - June 21 - July 22
    else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) {
      return (horoscope = "cancer");
    }
    // Leo - July 23 - Aug 22
    else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
      return (horoscope = "leo");
    }
    // Virgo - Aug 23 - Sept 22
    else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
      return (horoscope = "virgo");
    }
    // Libra - Sept 23 - Oct 22
    else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
      return (horoscope = "libra");
    }
    // Scorpio - October 23 - November 21
    else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
      return (horoscope = "scorpio");
    }
    // Sagittarius - November 22 - December 21
    else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
      return (horoscope = "sagittarius");
    }
  }

  function chineseZodiac(indate) {
    // using moment.js and moment-lunar.js

    var zodiacTable = [
      "Monkey",
      "Rooster",
      "Dog",
      "Pig",
      "Rat",
      "Ox",
      "Tiger",
      "Rabbit",
      "Dragon",
      "Snake",
      "Horse",
      "Goat"
    ];

    //convert date into lunar date
    var tlunar2 = moment(indate)
      .lunar()
      .format("YYYY-MM-DD");

    console.log("Test " + indate + " into lunar is " + tlunar2);

    var tlunarYear = moment(tlunar2).year();

    tsign = zodiacTable[tlunarYear % 12];

    console.log("tsign = " + tsign);

    return tsign;

    // 1924 = Rat
    // 1920 % 12 = 0
  }

  // callback function for horoscope call
  function getDataBoth() {
    keyword = getKeyword();
    sentiment = getSentiment();
  }

  function getSentiment() {
    console.log("resp2 = " + resp);
    token = "8921d8d3e0274f0997aa91de967aca75";

    queryURL3 =
      "https://api.dandelion.eu/datatxt/sent/v1/?text=" +
      encodeURI(resp) +
      "&token=" +
      token;
    console.log(queryURL3);
    $.ajax({
      type: "POST",
      url: queryURL3,
      dataType: "json"
    }).then(function(response) {
      //   console.log(response);
      console.log(response.sentiment.type);
      return response.sentiment.type;
    });
  }

  function getKeyword(options, callback) {
    console.log("resp2 = " + resp);
    token = "8921d8d3e0274f0997aa91de967aca75";

    queryURL2 =
      "https://api.dandelion.eu/datatxt/nex/v1/?text=" +
      encodeURI(resp) +
      "&min_confidence=0.5" +
      // "&top_entities=1"+
      "&token=" +
      token;

    console.log(queryURL2);
    $.ajax({
      type: "POST",
      url: queryURL2,
      dataType: "json"
    }).then(function(response) {
      //   console.log(response);
      // console.log(reponse.description);
      var arr = response.annotations;
      // sample reply  arr[x]   (useful spot,title, label)
      // start: 191
      // end: 196
      // spot: "happy"
      // confidence: 0.5371
      // id: 169409
      // title: "Happiness"
      // uri: "http://en.wikipedia.org/wiki/Happiness"
      // label: "Happiness"

      //  concat version
      //concat = ""
      // for (var i=0; i<arr.length;i++) {
      //     concat = concat + arr[i].label
      // }
      // random version
      var rand = Math.floor(Math.random() * arr.length);
      console.log(arr[rand].label);
      return arr[rand].label;
      // callback();
    });
  }

  function getHoroscope(horoscope, callback) {
    // var queryURL = "https://ohmanda.com/api/horoscope/" + horoscope + "/";

    // var queryURL = "https://cors-anywhere.herokuapp.com/https://sandipbgt.com/theastrologer/api/horoscope/"+horoscope+"/today/"
    // var res;

    // console.log(horoscope);
    var tsign = horoscope.toLowerCase();
    // tsign = tsign.lower();
    var queryURL =
      "https://aztro.sameerkumar.website?sign=" + tsign + "&day=today";

    $.ajax({
      type: "POST",
      url: queryURL,
      dataType: "json"
    }).then(function(response) {
      // options = response.description;
      resp = response.description;
      // console.log(response);
      // console.log(response.description);
      // console.log("options="+options)
      // console.log("resp="+resp)
      callback();
    });
  }

  // call it with the sign
  // getHoroscope(inSign,getDataBoth);
  // getDataBoth is callback that calls both keyword and sentiment

  //test Chinese Zodiac, should work with ANY date (even in the future)
  //  chineseZodiac("1970-01-01");

  //test regular Zodiac, should work with any date
  // console.log(getZodiac("1970-01-01"));
  // console.log(chineseZodiac("1970-01-01"));

  // var zodiac = chineseZodiac("1970-01-01");

  // stuff for
  var owmapikey = "8164cdd41308f159d85ff4ef8f3b5171"; // openweathermap.org
  var breezokey = "a7204a3f724a470fb35ad085b72fdba7"; //breezometer.com
  var curlat, curlon; // need it for UV, BreezoMeter, Pollen

  function kelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 1.8 + 32;
  }

  function queryCurrentWeather(inCity) {
    console.log(inCity);

    var retWeather = {
      cityName: "",
      curDate: "",
      iconWeatherUrl: "",
      curHumid: "",
      curTemp: "",
      curWind: ""
    };

    var queryurl1 =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      inCity +
      "&appid=" +
      owmapikey;

    // perform AJAX query here
    console.log(queryurl1);

    $.ajax({
      url: queryurl1,
      method: "GET"
    }).then(function(response) {
      res = response;

      console.log(res);

      // var curcity = res.name;
      // $("#curcity").text(res.name);
      retWeather.cityName = res.name;

      var curdate = new Date(res.dt * 1000);
      console.log(curdate);
      // $("#curdate").text(curdate.toLocaleDateString("en-US"));
      retWeather.curDate = curdate.toLocaleDateString("en-US");

      var iconweather = res.weather[0].icon; // how to convert that to real icon?
      console.log(iconweather);
      // $("#iconweather").html(
      //   "<img src='http://openweathermap.org/img/wn/" +
      //     iconweather +
      //     "@2x.png' />"
      // );
      retWeather.iconWeatherUrl =
        "http://openweathermap.org/img/wn/" + iconweather + "@2x.png";

      // var curtemp = res.main.temp; // convert from kelvin
      var fahsymbol = "&deg F";
      // $("#curtemp").html(
      // Math.round(kelvinToFahrenheit(res.main.temp) * 10) / 10 +
      // decodeURIComponent(fahsymbol)
      // );
      retWeather.curTemp =
        Math.round(kelvinToFahrenheit(res.main.temp) * 10) / 10 +
        decodeURIComponent(fahsymbol);

      // var curhumid = res.main.humidity; // add percentage sign
      // $("#curhumid").text(res.main.humidity + "%");
      retWeather.curHumid = res.main.humidity + "%";

      // var curwind = res.wind.speed; // velocity only?
      // $("#curwind").text(Math.round(res.wind.speed * 10) / 10 + " MPH");
      retWeather.curWind = Math.round(res.wind.speed * 10) / 10 + " MPH";

      // we're recording the lat-lon for the UV reading
      curlat = res.coord.lat;
      curlon = res.coord.lon;

      console.log(retWeather);
      console.log(curlat + " / " + curlon);
      return retWeather;
    });
  }

  function getBreezometerAQI(curlat, curlon) {
    // see https://docs.breezometer.com/api-documentation/air-quality-api/v2/#current-conditions

    var queryURLb =
      "https://api.breezometer.com/air-quality/v2/current-conditions?lat=" +
      curlat +
      "&lon=" +
      curlon +
      "&key=" +
      breezokey;

    console.log(queryURLb);
    $.ajax({
      type: "GET",
      url: queryURLb,
      dataType: "json"
    }).then(function(response) {
      // options = response.description;
      resp = response.data.indexes.baqi.aqi;
      console.log(resp);
      return resp;
      // callback();
    });
  }

  function getPollenForecast(curlat, curlon) {
    // see https://docs.breezometer.com/api-documentation/pollen-api/v2/#request-parameters

    var queryURLb =
      "https://api.breezometer.com/pollen/v2/forecast/daily?lat=" +
      curlat +
      "&lon=" +
      curlon +
      "&days=1" +
      "&key=" +
      breezokey;

    console.log(queryURLb);
    $.ajax({
      type: "GET",
      url: queryURLb,
      dataType: "json"
    }).then(function(response) {
      // options = response.description;
      console.log(response);
      resp = response.data[0].types;
      console.log(resp);
      return resp;
      // callback();
    });
  }

  function getGiphyImages(zodiac) {
    // Add image

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      zodiac +
      "&limit=1&api_key=wslWpWhssAgYDK6zVXacBDsacT47flr4";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      var gifs = response.data;
      console.log(gifs[0].images.original.url);
    });
  }
  // getGiphyImages(zodiac);
});
