# Astrodash

AstroDash is a daily morning dashboard that will allow the user to setup with birthday and location (city and state) so it can fetch horoscope, Chinese Zodiac, Daily Word, Sentiment, (both extracted from the daily horoscope), Local Weather, Air Quality Index, and Pollen Info through the use of several APIs.

## Notable features

- Modal dialogs using UIKit (by Rand, polish by Kasey)
- Logo (created by Rand, inverted/transparent'ed by Kasey)
- Extensive use of third-party API (Kasey and Nadine on research, Kasey on implementation)
- Random background (out of 6) (proposed by Rand, implemented by Kasey)
- Setup values are saved into localstroage and reused (by Kasey)
- Countdown to birthday counter (implemented by Kasey)
- Counter is now hidden UNTIL Setup was run. (by Kasey)

## Project Repo

[https://github.com/kschang77/astrodash2](https://github.com/kschang77/astrodash2)

NOTE: Rand was the repo master, but he claimed his original repo, astrodash, was all messed up that he created astrodash2. This is a fork off that and incorporates various fixes not in his version.

## Deployed Link

[https://kschang77.github.io/astrodash2/](https://kschang77.github.io/astrodash2/)

## Screenshots

### Main screen

NOTE: The countdown clock color issue has been fixed. It's now white again.

![Main Screen](assets/images/main.png)

### Setup Screen

click (setup) in upper left to bring up the setup screen.

Screenshot removed due to privacy concerns.

### Dashboard Screen

Click (dash) in upper right corner to bring up "dashboard".

![Dashboard Screen](assets/images/dashboard.png)

### Output Modal

And the result(s) are displayed.

![Output Modal](assets/images/output.png)

## AstroDash was built with

[Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) -- general use

[jQuery](https://jquery.com/) -- general use

[UIKit](https://getuikit.com/) -- overall UI

[OpenWeather API](https://openweathermap.org/api) -- weather info

[Moment.js](https://momentjs.com/) --general date functions

[Moment-lunar](https://github.com/Luavis/moment-lunar) -- conversion to lunar calendar

[Dandelion API](https://dandelion.eu/docs/) -- sentiment and keyword extraction

[Breezometer API](https://breezometer.com/) -- air quality and pollen

## Interesting Code Snippet

After checking various code snippets to calculate Chinese zodiac, most of them are wrong 1/10th of the time. The simple algorithms simply use the year for determination, neglecting to account for the year start difference. Lunar new year generally start in February of solar year, so people who are born between Jan 1 and Lunar New Year (aka Chinese New Year) will have the WRONG Chinese Zodiac with the simple algorithm. To get an accurate result, I had to write my own.

There are two approaches to take: either I can build a giant lookup table that contain the different start and end dates for each lunar new year, and the corresponding signs... Or I can locate a solar to lunar (and back) conversion library, use that to calculate the lunar year of the birthdate, then calculate the Chinese zodiac from that.

After a bit of checking, I was able to locate moment-lunar, a plug-in that added onto the Moment.js library to allow it to do solar and lunar date conversions. The following snippet shows how clean the code is, and it's 100% accurate.

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

            var tlunarYear = moment(tlunar2).year();

            tsign = zodiacTable[tlunarYear % 12];

            return tsign;
     }

Most Chinese zodiac table start with the year of the rat, i.e. 1924. However, 1924 does not divide into 12 cleanly. Rather than trying to deal with an offset, I decided to rotate the table so the table starts on a year that is easily divisible by 12, which was 1920, year of the Monkey.

More details are in the [Medium post](https://medium.com/@kschang777/ten-percent-of-you-in-the-west-have-the-wrong-chinese-zodiac-d3b4ba9c6b99), such as how I came up with the 10% figure.

## The secret history of AstroDash

### The Beginning

Originally, this was supposed to be a graphical parcel tracking app where I pull a parcel's tracking info, and graph them on a map API. However, when Rand objected rather vociferously for not having any input on the matter, Nadine and I decided to look over our old project ideas to see if there's anything he liked. And after going through 7-8 ideas, he seems to like Astrological Dashboard, and thus, AstroDash is born.

The original design of AstroDash was to pull multiple horoscopes from disparate sources, then run a keyword and sentiment analysis on all of them to see if they actually agree overall, or are they more like... random?

However, after several hours checking each and every Horoscope API listed at ProgrammableWeb (NOT RapidAPI as indicated in the presentation) we found, to our dismay, that there are only 10 or so potentially usable ones, and all but two of them require registration and is only free for two weeks. While that would be within the project's timeframe, we decided to pass. One of those claimed to be free with registration, but when my attempt to register resulted in an "Error 500" webpage, clearly that's out as well.

Of the remaining two, one was an "unofficial API" (i.e. dubious legality). We passed on that one as well.

With only one API left to use, clearly the idea was a no-go. And we had to pivot quickly. We decided to keep the dashboard idea and just add more function tiles, with only one horoscope, but attempt to wrestle a bit more meaning out of it with the sentiment and keyword analysis.

### The Pivot

At this point, Rand wanted to play with the UI, and I'm better at the backend. Nadine acted as a go-between and technical writer. However, there really was no specifications. In fact, I didn't know what the app was going to look like until... Thursday. I can work on the backend and experiment with the AJAX calls, but basically, ALL of the button integration was done Friday morning, started at 3AM, just before the presentation.

And what I got was just a shell. There were ZERO functionality except the buttons make a modal dialog pop up. And that's it. None of the dialog had any content. Only some of the dialog have ID for info pushing. And none of extra features, such as a timer that counts down to the birthday (lower left corner) and the randomized background were working.

And as I have received ZERO briefing about UIKit, I had to solve my own problems. Fortunately, they are rather small.

### The Marathon Session

Over the next 7 or so hours I fixed most of the bugs and implement the features properly, as well as hook in the various APIs and functions.

- Setup Modal Box, save input to localStorage -- by 0409
- Random background -- fixed at 0455
- Astrological sign, horoscope, Chinese Zodiac, Daily Word, and Daily Sentiment integration -- done at 0546
- Integrated Rand's logo- inverted into the app -- 0829
- All APIs integrated -- about 1049 (yes, I was programming while watching other teams present their stuff)

After the class is over I fixed the logo with true transparency. So it doesn't look like a glob of black in the middle.

And I made more minor edits as well as polish this README.

### Main Program

~~App was event driven. The main problem encountered, being a rush job, was failed to adequately plan the event loops to deal with startup situations where NO data had been entered.~~

~~What's supposed to happen is~~

- Program tries to read saved birthday and city/state values.
- Program repopulates the fields, even if they are blank
- Upon document loaded, it checks if the required fields are populated
  -- if populated, then Ajax calls will be made to fetch results
- If setup was brought up, then upon SUBMIT the Ajax calls will be made.

~~In reality, the events didn't actually quite happen this way. And that's a mess I have to untangle. It _was_ working at one point between 6AM and 10AM. Somehow the various merges seems to have broken it.~~ Program has been fixed.

On Monday morning, we discovered we did have a second usable horoscope that we can include. It is now active as button number 8 "Kelli Fox Horoscope".

### Limits and Workarounds

#### UIKit limitations

UIKit seems resistant to allow the user to set the background of an element... there is NO provision for it. The original plan for the sentiment (positive, neutral, or negative) was to color the background of the horoscope box. However, searching through the docs shows that there is no provision to set element's background to a custom color. Instead, [there are only four choices](https://getuikit.com/docs/background): default, muted, primary and secondary. While one could utilize a custom stylesheet, it seems a bit of an overkill for one feature. We ended up just coloring the headline.

#### API and CORS/CORB

During the API evaluation phase, significant amount of time was lost trying to get past the CORS/CORB problem. CORS (cross origin resource sharing) / CORB (cross origin resource blocking) are a set of security policies that allows or blocks outside access to prevent code-insertion / man-in-the-middle attacks. A full explanation of CORS is beyond the scope of this README.

To put it succintly, some APIs were not implemented properly and thus were blocked by browser's CORS/CORB filter. There are ways to bypass the CORS/CORB restrictions but it doesn't always work. And we decided our time is best spent elsewhere.

We did manage to get ONE of the API bypassed with CORS-Anywhere bypass tool. It was added as Button 8.

#### Moment.js quirks

Using moment.js has its issues and quirks, and both caused some minor problems.

- Moment.js "month" starts at 0, not 1, while day does start with 1. This caused some minor problems.

- moment.js values are mutable. That means if you set a moment value to X, then do Y = X, and change X again, both X and Y will be changed. One must explicitly create a new moment value, not just a pointer to existing value. This caused a problem in the birthday calculation as I need both the original birthday AND a "birthday in current year" variable, and the calculations destroyed the original birthday. (see script.js 45-47)

## Stretch Goals / Future Development

~~The setup does not quite work at the moment. One of the merges seems to have broken it, or somewhere between 3AM and now I screwed it up. I am still trying to debug it.~~ Fixed, turns out moment objects are mutable, and I had to create new ones a different way, and fix sequence of some events.

There was STILL no validation on the form input fields, despite demo-ing jvalidate (for JQuery) to the team several days ago (and I incorporated it into NYTSearch, the previous team activity, as a demo).

It would be nice to validate the city and state values using a geocode API, and it appears that Mapbox has a free temporary geocoding API available for up to 100K uses per month.

It would be nice to prevent users from clicking on "dash" before setup was run. And to automatically pop-up setup if there were no values to be read the first time.

Some advice on the Chinese Zodiac could be added. Right now, it just tells you what Chinese zodiac you are. Haven't found an API for that yet. Will probalby have to use a static table.

~~The lower left countdown is now a muted gray instead of proper white, and I can't figure out why. I turned it cyan for slightly better contrast, but it seems to be a uikit problem.~~ Found the problem. Someone removed .uk-light from the counter. It was there before. It is there now.

The proposed Giphy button, the generated playlist, or the moon-phase button was never implemented. There are ~~two~~ one button hidden at this time that may be utilized.

## Author

### Kasey Chang

- [Link to Github](https://github.com/kschang77)
- [Link to LinkedIn](https://www.linkedin.com/in/kasey-chang)

With additional design by Rand Hunt and Nadine Bundschuh

## License

This project is licensed under the MIT License

## Acknowledgments

Hat tip to Nadine and Rand for "teamwork", and Jerome, Kerwin, Mahi, and the UCBEx Coding Bootcamp March 2020 cohort
