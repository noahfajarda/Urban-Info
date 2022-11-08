// add input element to page
var userInput = document.createElement("input");
document.body.appendChild(userInput);
// listen for user keyboard input
userInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        // search for city upon enter
        searchCity(event.target.value);
    }
});

function callCity(search) {
    return fetch(`https://api.teleport.org/api/cities/?search=${search}`);
}
function searchCity(city) {
    // fetch api using 'callCity' function
    city = city.replaceAll(" ", "-");
    console.log(city);
    cityData(city)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });

    citySalaries(city)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
}

function cityData(area) {
    return fetch(
        `https://api.teleport.org/api/urban_areas/slug:san-francisco-bay-area/details`
    );
}

function citySalaries(area) {
    return fetch(
        `https://api.teleport.org/api/urban_areas/slug:san-francisco-bay-area/salaries`
    );
}
