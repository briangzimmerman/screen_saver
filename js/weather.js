function Weather(zip) {
    this.zip = zip;
    this.weather = undefined;
}

Weather.prototype.update = function() {
    var dfd = $.Deffered();

    $.ajax({

    })
    .fail(function(response) {
        dfd.reject('Could not update weather');
    })
    .done(function(response) {
        dfd.resolve(response);
    });

    return dfd.promise();
};

Weather.prototype.getTemperature = function() {

};

Weather.prototype.getWeather = function() {

};