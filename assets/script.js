// Once document is loaded
var resp = "";
var bday, astrosign, czodiac, keyword, sentiment;
var owmapikey = "8164cdd41308f159d85ff4ef8f3b5171"; // openweathermap.org
var breezokey = "a7204a3f724a470fb35ad085b72fdba7"; //breezometer.com
var curlat, curlon; // need it for UV, BreezoMeter, Pollen

$(document).ready(function () {
  //   var horoscope = "";
  if (localStorage.getItem("month") !== null) {
    updateTiles1();
  } else {
    // hide the timer
    $("#countdown").addClass("uk-hidden");
  }

  if (localStorage.getItem("city") !== null) {
    updateTiles2();
  }

  function saveInputtoLS1() {
    // saves the various input fields to LocalStorage
    localStorage.setItem("day", $("#bday-day").val());
    localStorage.setItem("month", $("#bday-month").val());
    localStorage.setItem("year", $("#bday-year").val());
  }

  function saveInputtoLS2() {
    localStorage.setItem("city", $("#city").val());
    localStorage.setItem("state", $("#state").val());
  }

  function updateTiles1() {
    bday = moment(
      //   $("#bday").val()
      localStorage.getItem("month") +
        "-" +
        localStorage.getItem("day") +
        "-" +
        localStorage.getItem("year"),
      "MM-DD-YYYY"
    );

    curyear = moment().year();
    tbday = moment(bday);
    tbday = tbday.year(curyear);
    console.log("bday = " + bday, "tbday = " + tbday);
    console.log(tbday.format(moment.HTML5_FMT.DATE));

    // update clock to count to the right date
    $("#countdown").attr(
      "uk-countdown",
      "date: " + tbday.format(moment.HTML5_FMT.DATE)
    );

    // make it visible
    $("#countdown").removeClass("uk-hidden");

    astrosign = getZodiac(bday);
    console.log("astrosign=" + astrosign);

    console.log($("#modal1").text());
    //set modal1 to astrological sign
    $("#modal1").text(astrosign);

    czodiac = chineseZodiac(bday);
    console.log("czodiac=" + czodiac);

    //   $(".horoscope2").text(czodiac);
    //   $("#horoscope2").text(" is your Chinese zodiac");
    // set modal2 to Chinese zodiac
    $("#modal2").text(czodiac);

    getHoroscope(astrosign, getDataBoth);
    // resp now contains the horoscope
    //   $("#horoscope1").text(resp);
    $("#app1").text(resp);

    // keyword now has the keyword from horoscope
    $("h2#modal3").text(keyword);
    $("#app3").text(" is your word of the day");

    // sentiment now has sentiment from horoscope
  }

  function getDataBoth2(curlat, curlon) {
    getBreezometerAQI(curlat, curlon);
    getPollenForecast(curlat, curlon);
  }

  function updateTiles2() {
    // tries to read city/state from localstorage
    // localStorage.setItem("city", $("#city").val());
    // localStorage.setItem("state", $("#state").val());

    var tcity = localStorage.getItem("city");
    var tstate = localStorage.getItem("state");

    // if either are blank, set displays to "run setup first"

    if (tcity === "" || tstate === "") {
      $("h2#modal5").text("No Data");
      $("#app5").text(
        "Please enter a city and state in setup to see weather, air quality, and pollen info"
      );

      $("h2#modal6").text("No Data");
      $("#app6").text(
        "Please enter a city and state in setup to see weather, air quality, and pollen info"
      );

      $("h2#modal7").text("No Data");
      $("#app7").text(
        "Please enter a city and state in setup to see weather, air quality, and pollen info"
      );
      return;
    } else {
      saveInputtoLS2();
      // get weather
      queryCurrentWeather(tcity, tstate, getDataBoth2);
      // the callback get AQI and get pollen
    }
  }

  //setup submit
  $("#setup-submit").on("click", function (event) {
    event.preventDefault();
    bday = moment(
      //   $("#bday").val()
      $("#bday-month").val() +
        "-" +
        $("#bday-day").val() +
        "-" +
        $("#bday-year").val(),
      "MM-DD-YYYY"
    );

    if (!bday.isValid()) {
      alert("Date entered is not valid!");
      return;
    }
    // save the bday to localstorage
    saveInputtoLS1();
    // update the b-day dependent tiles
    updateTiles1();

    // some sort of validate for city/state
    // none at the moment
    // save the input to localstorage
    saveInputtoLS2();
    // update the city dependent tiles
    updateTiles2();
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
      "Goat",
    ];

    //convert date into lunar date
    var tlunar2 = moment(indate).lunar().format("YYYY-MM-DD");

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
    var sentiment = "";
    queryURL3 =
      "https://api.dandelion.eu/datatxt/sent/v1/?text=" +
      encodeURI(resp) +
      "&token=" +
      token;
    console.log(queryURL3);
    $.ajax({
      type: "POST",
      url: queryURL3,
      dataType: "json",
    }).then(function (response) {
      //   console.log(response);
      console.log(response.sentiment.type);
      $("h2#modal4").text(response.sentiment.type);
      $("#app4").text(" is your sentiment of the day");
      sentiment = response.sentiment.type;
      $("h2#modal4").removeClass(
        "uk-text-success uk-text-warning uk-text-danger"
      ); // remove previous text colors, if any
      if (sentiment === "positve") {
        $("h2#modal4").addClass("uk-text-success");
      }
      if (sentiment === "neutral") {
        $("h2#modal4").addClass("uk-text-primary");
      }
      if (sentiment === "negative") {
        $("h2#modal4").addClass("uk-text-danger");
      }
      $("#app4").text(" is your sentiment of the day");
      //  changing box color
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
      dataType: "json",
    }).then(function (response) {
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

      $("h2#modal3").text(arr[rand].label);
      $("#app3").text(" is your word of the day");

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
      dataType: "json",
    }).then(function (response) {
      // options = response.description;
      resp = response.description;
      $("#app1").text(resp);

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

  function kelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 1.8 + 32;
  }

  function queryCurrentWeather(inCity, inState, callback) {
    console.log(inCity);

    var retWeather = {
      cityName: "",
      curDate: "",
      iconWeatherUrl: "",
      curHumid: "",
      curTemp: "",
      curWind: "",
    };

    var queryurl1 =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      encodeURI(inCity) +
      "," +
      encodeURI(inState) +
      "&appid=" +
      owmapikey;

    // perform AJAX query here
    console.log(queryurl1);

    $.ajax({
      url: queryurl1,
      method: "GET",
    }).then(function (response) {
      res = response;

      console.log(res);

      // var curcity = res.name;
      // $("#curcity").text(res.name);
      retWeather.cityName = res.name;
      $("h2#modal5").text(res.name);

      var curdate = new Date(res.dt * 1000);
      console.log(curdate);
      // $("#curdate").text(curdate.toLocaleDateString("en-US"));
      retWeather.curDate = curdate.toLocaleDateString("en-US");
      var thtml = "<h2>" + curdate.toLocaleDateString("en-US") + "</h2>";

      var iconweather = res.weather[0].icon; // how to convert that to real icon?
      console.log(iconweather);
      // $("#iconweather").html(
      //   "<img src='http://openweathermap.org/img/wn/" +
      //     iconweather +
      //     "@2x.png' />"
      // );
      retWeather.iconWeatherUrl =
        "http://openweathermap.org/img/wn/" + iconweather + "@2x.png";

      thtml +=
        "<P><img src='http://openweathermap.org/img/wn/" +
        iconweather +
        "@2x.png' /></P>";

      // var curtemp = res.main.temp; // convert from kelvin
      var fahsymbol = "&deg F";
      // $("#curtemp").html(
      // Math.round(kelvinToFahrenheit(res.main.temp) * 10) / 10 +
      // decodeURIComponent(fahsymbol)
      // );
      retWeather.curTemp =
        Math.round(kelvinToFahrenheit(res.main.temp) * 10) / 10 +
        decodeURIComponent(fahsymbol);

      thtml +=
        "<P>" +
        Math.round(kelvinToFahrenheit(res.main.temp) * 10) / 10 +
        decodeURIComponent(fahsymbol) +
        "</P>";

      // var curhumid = res.main.humidity; // add percentage sign
      // $("#curhumid").text(res.main.humidity + "%");
      retWeather.curHumid = res.main.humidity + "%";

      thtml += "<p>" + res.main.humidity + "%" + "</p>";

      // var curwind = res.wind.speed; // velocity only?
      // $("#curwind").text(Math.round(res.wind.speed * 10) / 10 + " MPH");
      retWeather.curWind = Math.round(res.wind.speed * 10) / 10 + " MPH";

      thtml += "<p>" + Math.round(res.wind.speed * 10) / 10 + " MPH</p>";
      // set the cell text

      // we're recording the lat-lon for the UV reading
      $("#app5").html(thtml);

      curlat = res.coord.lat;
      curlon = res.coord.lon;

      console.log(retWeather);
      console.log(curlat + " / " + curlon);

      callback(curlat, curlon);
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
      dataType: "json",
    }).then(function (response) {
      // options = response.description;
      resp = response.data.indexes.baqi.aqi;
      console.log(resp);

      $("h2#modal6").text("Your local Air Quality Index");
      $("#app6").text(resp);

      return resp;
      // callback();
    });
  }

  function getPollenForecast(curlat, curlon) {
    // see https://docs.breezometer.com/api-documentation/pollen-api/v2/#request-parameters

    var thtml = "";
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
      dataType: "json",
    }).then(function (response) {
      // options = response.description;
      console.log(response);
      resp = response.data[0].types;
      console.log(resp);

      $("h2#modal7").text("Your local pollen data");

      try {
        txt = "<P>Grass pollen data = " + resp.grass.index.value + "</P>";
        thtml += txt;
        console.log(thtml);
      } catch (err) {
        console.log("no grass pollen info / " + thtml);
      }

      try {
        txt = "<P>Tree pollen data = " + resp.tree.index.value + "</P>";
        thtml += txt;
        console.log(thtml);
      } catch (err) {
        console.log("no tree pollen info / " + thtml);
      }

      try {
        txt = "<P>Weed pollen data = " + resp.weed.index.value + "</P>";
        thtml += txt;
        console.log(thtml);
      } catch (err) {
        console.log("no weed pollen info / " + thtml);
      }
      $("#app7").html(thtml);
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
      method: "GET",
    }).then(function (response) {
      console.log(response);

      var gifs = response.data;
      console.log(gifs[0].images.original.url);
    });
  }
  // getGiphyImages(zodiac);
});
