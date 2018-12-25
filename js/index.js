var $date = $('#date');
var $time = $('#time');
var $temp = $('#temperature');
var $weather_icon = $('.wi');
var $weather_desc = $('#weather_description');
var weather = false;

//Update background
updateBackground();
setInterval(updateBackground, 30 * 60 * 1000); //30 minutes

//Update Weather
navigator.geolocation.getCurrentPosition(function(position) {
    weather = new Weather(
        position.coords.latitude,
        position.coords.longitude
    );

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