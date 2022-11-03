var containerEl = document.querySelector('#container');
// get today to change the url
var today = moment().subtract(1, 'days');
var year = today.format("YYYY");
var month = today.format("MMM").toUpperCase();
var day = today.format("DD");
var hourToday = Number(today.format("H"));


function getApi() {
    // get the api for box scores based on yesterday's date
    var requestUrl = 'https://api.sportsdata.io/v3/nba/stats/json/BoxScores/' + year + '-' + month + '-' + day + '?key=e1aeebd264c0494293ee41a4db3c65be';
    console.log(requestUrl);

    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);

            // print players from first game to the screen
            var allPlayers = data[0].PlayerGames;
            console.log(data[0].PlayerGames);
            for (var i = 0; i < allPlayers.length; i++) {
                console.log(i, allPlayers[i].Name);



                var element = document.createElement('h1');
                element.textContent = (i + 1) + ". " + allPlayers[i].Name;
                containerEl.appendChild(element);


                
            };
        });

}
getApi();