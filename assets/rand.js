

// Random Background Image

$(document).ready(function(){
var images=['images/bg1.jpg',
            'images/bg2.jpg',
            'images/bg3.jpg',
            'images/bg4.jpg',
            'images/bg5.jpg',];

var randomNumber = Math.floor(Math.random() * images.length);
var bgImg = 'url(' + images[randomNumber] + ')';

$('body').css({'background':bgImg, 'background-size':'cover', });

});


//Birthday Countdown 




//Moon Phase Api


$(document).ready(function(){
    var classCycle=['imageCycle1','imageCycle2'];

    var randomNumber = Math.floor(Math.random() * classCycle.length);
    var classToAdd = classCycle[randomNumber];

    $('body').addClass(classToAdd);
});
 




// Background randomize
// var totalCount = 6;
// function ChangeIt() 
// {
// var num = Math.ceil( Math.random() * totalCount );
// document.body.background = 'images/bg/'+num+'.jpg';
// document.body.style.backgroundRepeat = "repeat";
// }
