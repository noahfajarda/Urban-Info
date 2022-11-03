var settings = {
    "url": "https://api-nba-v1.p.rapidapi.com/{endpoint}",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "x-rapidapi-key": "9f2b75da5a320b88cead1fc580282b4a",
        "x-rapidapi-host": "api-nba-v1.p.rapidapi.com"
    },
};

$.ajax(settings).done(function (response) {
    console.log(response);
});