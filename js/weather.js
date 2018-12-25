function Weather(lat, lon) {
    this.lat = lat;
    this.lon = lon;
    this.weather = undefined;

    this.iconMap = {
        '01d': 'wi-day-sunny',
        '01n': 'wi-night-clear',

        '02d': 'wi-day-cloudy',
        '02n': 'wi-night-alt-cloudy',

        '03d': 'wi-cloud',
        '03n': 'wi-cloud',

        '04d': 'wi-cloudy',
        '04n': 'wi-cloudy',

        '09d': 'wi-day-showers',
        '09n': 'wi-night-alt-showers',

        '10d': 'wi-day-rain',
        '10n': 'wi-night-alt-rain',

        '11d': 'wi-day-lightning',
        '11n': 'wi-night-alt-lightning',

        '13d': 'wi-day-snow',
        '13n': 'wi-night-alt-snow'
    };
}

Weather.prototype.update = function() {
    var dfd = $.Deferred();

    self = this;

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${self.lat}&lon=${self.lon}&APPID=${config.weather_api_key}`,
        dataType: 'jsonp',
        jsonp: 'callback'
    })
    .fail(function(response) {
        console.log(response)
        dfd.reject('Could not update weather');
    })
    .done(function(weather) {
        self.weather = weather;
        dfd.resolve('Updated Weather');
    });

    return dfd.promise();
};

Weather.prototype.getTemperature = function() {
    if(!this.weather) { return undefined; }

    return this.KelToFer(this.weather.main.temp);
};

Weather.prototype.getWeather = function() {
    if(!this.weather) { return undefined; }

    return {
        description: this.titleCase(this.weather.weather[0].description),
        icon_class: this.iconMap[this.weather.weather[0].icon]
    };
};

Weather.prototype.KelToFer = function(kelvin) {
    return Math.round((kelvin - 273.15) * 1.8 + 32);
};

Weather.prototype.titleCase = function(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}