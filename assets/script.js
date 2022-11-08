// function to create search bars
// reason: city & urban area event listeners
function createSearchBar(type) {
    // add input element to page
    var userInput = document.createElement("input");
    userInput.setAttribute("id", type);
    userInput.setAttribute("placeholder", type);
    document.body.appendChild(userInput);

    userInput.addEventListener("keyup", function (event) {
        // different actions depending on searchBarID
        // when user presses enter:
        if (event.key === "Enter") {
            if (this.id === "Urban Area") {
                // search for urban area upon enter
                searchUrbanAreas(event.target.value);
            } else if (this.id === "City") {
                console.log("function for urban area");
            }
        }
    });
}

// add 'Urban Area' & 'city' input elements to page
createSearchBar("Urban Area");
createSearchBar("City");

function callCity(search) {
    return fetch(`https://api.teleport.org/api/cities/?search=${search}`);
}

function searchUrbanAreas(urbanArea) {
    urbanArea = urbanArea.replaceAll(" ", "-");
    console.log(urbanArea);
    urbanData(urbanArea)
        .then((response) => response.json())
        .then((data) => {
            console.log("Details:", data);
        });

    urbanSalaries(urbanArea)
        .then((response) => response.json())
        .then((data) => {
            console.log("Salaries:", data);
        });

    // creates list of all possible urban areas in API
    urbanAreasList()
        .then((response) => response.json())
        .then((data) => {
            var urbanAreaData = data._links["ua:item"];
            var urbanAreaNameList = [];
            for (var i = 0; i < data._links["ua:item"].length; i++) {
                urbanAreaNameList.push(urbanAreaData[i].name);
            }
            // All urban Areas
            console.log(urbanAreaNameList);
        });
}

// shortcuts to urban data, urban salaries fetch apis
function urbanData(area) {
    return fetch(
        `https://api.teleport.org/api/urban_areas/slug:san-francisco-bay-area/details`
    );
}

function urbanSalaries(area) {
    return fetch(
        `https://api.teleport.org/api/urban_areas/slug:san-francisco-bay-area/salaries`
    );
}

function urbanAreasList() {
    return fetch("https://api.teleport.org/api/urban_areas/");
}
