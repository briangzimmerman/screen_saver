var $date = $('#date');
var $time = $('#time');
var $temp = $('#temperature');
var $weather_icon = $('.wi');
var $weather_desc = $('#weather_description');
var weather = false;
var socket = io();

//Update background
updateBackground();
setInterval(updateBackground, 30 * 60 * 1000); //30 minutes

//Update Weather
socket.on('location', function(loc) {
    weather = new Weather(loc.lat, loc.lon);
    updateWeather();
});

setInterval(updateWeather, 30 * 60 * 1000); //30 minutes

//Update Time/Date
setInterval(function() {
    $date.text(moment().format('dddd, MMMM Do'));
    $time.text(moment().format('h:mm a'));
}, 1000);


function updateWeather() {
    if(!weather) { return; }

    $.when(weather.update())
    .then(() => {
        var temp = weather.getTemperature() + ' &#8457;';
        $temp.html(temp);

        var current_weather = weather.getWeather();
        $weather_icon.replaceWith('<i class="wi '+current_weather.icon_class+'"></i>');
        $weather_desc.text(current_weather.description);
    })
    .catch(() => { return; });
}

function updateBackground() {
    $.when(getBackground())
    .then((url) => {
        $('body').css('background-image', 'url("'+url+'")');
    })
    .catch(() => { return; });
}