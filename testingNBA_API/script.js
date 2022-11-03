var containerEl = document.querySelector('#container');


function getApi() {
    var requestUrl = 'https://api.sportsdata.io/v3/nba/stats/json/BoxScores/2022-NOV-01?key=e1aeebd264c0494293ee41a4db3c65be';

    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);

            // print players to the screen
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