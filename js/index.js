var $date = $('#date');
var $time = $('#time');


setInterval(function() {
    $date.text(moment().format('dddd, MMMM Do'));
    $time.text(moment().format('h:mm a'));
}, 1000);