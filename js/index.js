var $date = $('#date');
var $time = $('#time');

updateBackground();

setTimeout(function() {
    updateBackground();
    setInterval(updateBackground, 60000);
}, (60 - new Date.getMinutes) * 60000);


setInterval(function() {
    $date.text(moment().format('dddd, MMMM Do'));
    $time.text(moment().format('h:mm a'));
}, 1000);