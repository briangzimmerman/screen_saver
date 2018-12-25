function getBackground() {
    var dfd = $.Deferred();

    $.ajax({
        url: 'https://api.unsplash.com/photos/random',
        method: 'get',
        dataType: 'json',
        headers: {
            Authorization: `Client-ID ${config.unsplash_api_key}`
        },
        data: {
            orientation: 'landscape',
            featured: true
        }
    })
    .fail(function(response) {
        console.log(response);
        dfd.reject();
    })
    .done(function(response) {
        dfd.resolve(response.urls.full);
    });

    return dfd.promise();
}