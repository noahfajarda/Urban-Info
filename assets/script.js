// utility function to dynamically create and append elements
// function can also accept ids & classes
function createEl(
    element,
    innerHTML,
    id = "",
    classes = "",
    parent = "",
    prependAppend = ""
) {
    var element = document.createElement(element);
    element.innerHTML = innerHTML;
    // add classes
    if (typeof classes == "object") {
        for (var i = 0; i < classes.length; i++) {
            element.classList.add(classes[i]);
        }
    } else if (classes === "") {
        var nothing = 0;
    } else {
        element.classList.add(classes);
    }
    // add id
    if (id !== "") {
        element.setAttribute("id", id);
    } else {
        var nothing2 = 0;
    }
    // parent
    // console.log(parent);
    if (parent !== "") {
        // prependAppend
        if (prependAppend == "prepend") {
            $(parent).prepend(element);
        }
    } else {
        document.body.appendChild(element);
    }
}

// upon pressing enter in Logan's input box, it retrieves the data
var userInput = $("#myInput");
userInput.on("keyup", function (event) {
    // different actions depending on searchBarID
    // when user presses enter:
    if (event.key === "Enter" && event.target.value !== "") {
        // search for urban area upon enter
        searchUrbanAreas(event.target.value);
        if (urbanAreas.includes(event.target.value)) {
            addUrbanButton(event.target.value);
        } else {
            invalidUserInput();
        }
        event.target.value = "";
    }
});

// retrieve data upon clicking submit button too
var submitBtn = $("#submitBtn");
submitBtn.on("click", function (event) {
    var userInput = document.getElementById("myInput").value;
    searchUrbanAreas(userInput);
    if (urbanAreas.includes(userInput)) {
        addUrbanButton(userInput);
    } else {
        invalidUserInput();
    }
    document.getElementById("myInput").value = "";
});

var urbanAreasHistory = [];
function addUrbanButton(userInput) {
    if (!urbanAreasHistory.includes(userInput)) {
        // if UA doesn't exist
        syncLocalStorage(userInput);
        // prettier-ignore
        createEl("button", userInput, (id = userInput.replaceAll(" ", "")), (classes = "urbanArea"), "#urbanAreaButtonList", "prepend");
        $("#" + userInput.replaceAll(" ", "")).on("click", function () {
            searchUrbanAreas(userInput);
        });
    } else {
        console.log("NOT ADDED:", urbanAreasHistory);
    }
}

// add to local storage
function syncLocalStorage(value) {
    // add the urban area to history array
    urbanAreasHistory.push(value);
    localStorage.setItem(
        "Urban Area History",
        JSON.stringify(urbanAreasHistory)
    );
}

// add buttons already in local storage
function createUrbanButtonsLocal(history) {
    history = JSON.parse(history);
    if (history !== null) {
        for (var i = 0; i < history.length; i++) {
            addUrbanButton(history[i]);
        }
        $("#clearBtn").css("display", "inline");
    }
}
createUrbanButtonsLocal(localStorage.getItem("Urban Area History"));

function retrieveAllUrbanAreas() {
    // prettier-ignore
    var urbanAreas = ["Aarhus", "Adelaide", "Albuquerque", "Almaty", "Amsterdam", "Anchorage", "Ankara", "Asheville", "Asuncion", "Athens", "Atlanta", "Auckland", "Austin", "Baku", "Bali", "Bangkok", "Barcelona", "Beijing", "Beirut", "Belfast", "Belgrade", "Belize City", "Bengaluru", "Berlin", "Bern", "Birmingham", "Bogota", "Boise", "Bologna", "Bordeaux", "Boston", "Boulder", "Bozeman", "Bratislava", "Brisbane", "Bristol", "Brussels", "Bucharest", "Budapest", "Buenos Aires", "Buffalo", "Cairo", "Calgary", "Cambridge", "Cape Town", "Caracas", "Cardiff", "Casablanca", "Charleston", "Charlotte", "Chattanooga","Chennai", "Chiang Mai", "Chicago", "Chisinau", "Christchurch", "Cincinnati", "Cleveland", "Cluj-Napoca", "Cologne", "Colorado Springs", "Columbus", "Copenhagen", "Cork", "Curitiba", "Dallas", "Dar es Salaam", "Delhi", "Denver", "Des Moines", "Detroit", "Doha", "Dresden", "Dubai", "Dublin", "Dusseldorf", "Edinburgh", "Edmonton", "Eindhoven", "Eugene", "Florence", "Florianopolis", "Fort Collins", "Frankfurt", "Fukuoka", "Gdansk", "Geneva", "Glasgow", "Gothenburg", "Grenoble", "Guadalajara", "Guatemala City", "Halifax", "Hamburg", "Hannover", "Havana", "Helsinki", "Ho Chi Minh City", "Hong Kong", "Honolulu", "Houston", "Hyderabad", "Indianapolis", "Innsbruck", "Istanbul", "Jacksonville", "Jakarta", "Johannesburg", "Kansas City", "Karlsruhe", "Kathmandu", "Kiev", "Kingston", "Knoxville", "Krakow", "Kuala Lumpur", "Lagos", "La Paz", "Las Palmas de Gran Canaria", "Las Vegas", "Lausanne", "Leipzig", "Lille", "Lima", "Lisbon", "Liverpool", "Ljubljana", "London", "Los Angeles", "Louisville", "Luxembourg", "Lviv", "Lyon", "Madison", "Madrid", "Malaga", "Malmo", "Managua", "Manchester", "Manila", "Marseille", "Medellin", "Melbourne", "Memphis", "Mexico City", "Miami", "Milan", "Milwaukee", "Minneapolis-Saint Paul", "Minsk", "Montevideo", "Montreal", "Moscow", "Mumbai", "Munich", "Nairobi", "Nantes", "Naples", "Nashville", "New Orleans", "New York", "Nice", "Nicosia", "Oklahoma City", "Omaha", "Orlando", "Osaka", "Oslo", "Ottawa", "Oulu", "Oxford", "Palo Alto", "Panama", "Paris", "Perth", "Philadelphia", "Phnom Penh", "Phoenix", "Phuket", "Pittsburgh", "Portland, ME", "Portland, OR", "Porto", "Porto Alegre", "Prague", "Providence", "Quito", "Raleigh", "Reykjavik", "Richmond", "Riga", "Rio De Janeiro", "Riyadh", "Rochester", "Rome", "Rotterdam", "Saint Petersburg", "Salt Lake City", "San Antonio", "San Diego", "San Francisco Bay Area", "San Jose", "San Juan", "San Luis Obispo", "San Salvador", "Santiago", "Santo Domingo", "Sao Paulo", "Sarajevo", "Saskatoon", "Seattle", "Seoul", "Seville", "Shanghai", "Singapore", "Skopje", "Sofia", "St. Louis", "Stockholm", "Stuttgart", "Sydney", "Taipei", "Tallinn", "Tampa Bay Area", "Tampere", "Tartu", "Tashkent", "Tbilisi", "Tehran", "Tel Aviv", "The Hague", "Thessaloniki", "Tokyo", "Toronto", "Toulouse", "Tunis", "Turin", "Turku", "Uppsala", "Utrecht", "Valencia", "Valletta", "Vancouver", "Victoria", "Vienna", "Vilnius", "Warsaw", "Washington, D.C.", "Wellington", "Winnipeg", "Wroclaw", "Yerevan", "Zagreb", "Zurich"];
    return urbanAreas;
}
var urbanAreas = retrieveAllUrbanAreas();

//autocomplete code from: https://www.w3schools.com/howto/howto_js_autocomplete.asp
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        // prettier-ignore
        var a,b,i,val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (
                arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()
            ) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML =
                    "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                    // refocuses element after clicking one of the autocomplete buttons
                    $("#myInput").focus();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) {
            //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
/*initiate the autocomplete function on the "myInput" element, and pass along the urbanAreas array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), urbanAreas);
// NOAH START
// creates list of all possible urban areas in API
urbanAreasList()
    .then((response) => response.json())
    .then((data) => {
        var urbanAreaData = data._links["ua:item"];
        var urbanAreaNameList = [];
        for (var i = 0; i < urbanAreaData.length; i++) {
            urbanAreaNameList.push(urbanAreaData[i].name);
        }
        // All urban Areas
        console.log("Array of Urban Areas: ", urbanAreaNameList);
    });

var dataMap = [
    {
        selector: $("#businessFreedom"),
    },
];

function clearHistory() {
    urbanAreasHistory = [];
    localStorage.setItem(
        "Urban Area History",
        JSON.stringify(urbanAreasHistory)
    );
    $(".urbanArea").remove();
    $("#clearBtn").css("display", "none");
}
$("#clearBtn").on("click", clearHistory);

// search urban areas for their data (area qualities & Salary data)
function searchUrbanAreas(urbanArea) {
    if (!urbanAreas.includes(urbanArea)) {
        return;
    }

    urbanArea = urbanArea.replaceAll(" ", "-");
    urbanData(urbanArea)
        .then((response) => response.json())
        .then((data) => {
            // all data we need
            var areaQualities = retrieveCategoryData(data);
            console.log("Area Qualities:", areaQualities);
            console.log(data);

            // structure of Area Qualities array:
            // [{"Category": {"SubCategory": "", "SubCategory": "", ...}},
            // {"Category": {"SubCategory": "", "SubCategory": "", ...}},
            // ...]

            // display urban name
            // var areaVal =
            $("#urbanAreaName").text(urbanArea.replaceAll("-", " "));

            // IF using an array
            for (var i = 0; i < areaQualities.length; i++) {
                var data = areaQualities[i];
                data.selector.text(data.value);
            }
        });

    $("#clearBtn").css("display", "inline");
}

// retrieves all salaries from all occupations of urban area
function retrieveSalaries(data) {
    var salaryDataArray = [];
    for (var i = 0; i < data.salaries.length; i++) {
        // Job title
        var jobTitle = data.salaries[i].job.title;
        // Salaries for that job title
        var salaries = [
            data.salaries[i].salary_percentiles.percentile_25,
            data.salaries[i].salary_percentiles.percentile_50,
            data.salaries[i].salary_percentiles.percentile_75,
        ];

        // add job & salaries to array as object
        salaryDataArray.push({
            "Job Title": jobTitle,
            Salaries: salaries,
        });
    }
    // all jobs & salary percentiles
    return salaryDataArray;
}

// retrieves all category data from urban area
function retrieveCategoryData(data) {
    var categories = data.categories;
    // follows 'data to use' list on group doc
    var areaQualities = {
        "Business Freedom": {
            // add .float_value for each one
            // note ratings, units, currency
            "Business Freedom": categories[0].data[0],
            "Corruption Freedom": categories[0].data[2],
            "Labor Restrictions": categories[0].data[4],
        },
        "City Size": {
            "UA Population Size": categories[1].data[0],
            "UA Population Density": categories[1].data[1],
            "City Center Population Density": categories[1].data[2],
        },
        "Cost of Living": {
            "Consumer Price Index": categories[3].data[0],
            "Cost of Public Transport": categories[3].data[7],
            "Cost of Restaurant Meal": categories[3].data[8],
        },
        Economy: {
            "GDP Growth Rate": categories[5].data[2],
            "GDP Per Capita": categories[5].data[4],
        },
        Education: {
            "Student Happiness": categories[6].data[0],
            "PISA Ranking": categories[6].data[11],
            "PISA Ranking Telescore": categories[6].data[12],
            "Best University": categories[6].data[16],
            "Best University Rank": categories[6].data[17],
        },
        "Health Care": {
            Cost: categories[7].data[0],
            Quality: categories[7].data[3],
        },
        "Cost of Housing": {
            "Apartment Rent for Large Apartment": categories[8].data[0],
            "Apartment Rent for Medium Apartment": categories[8].data[1],
            "Apartment Rent for Small Apartment": categories[8].data[2],
            "Rent Index Telescore": categories[8].data[3],
        },
        Pollution: {
            "Air Pollution": categories[15].data[0],
            Cleanliness: categories[15].data[1],
            "Water Quality": categories[15].data[2],
        },
        Safety: {
            "Crime Rate": categories[16].data[0],
            "Gun Death Score": categories[16].data[2],
            "Gun Ownership Score": categories[16].data[4],
        },
        Taxation: {
            "Income Tax": categories[18].data[2],
            "Sales Tax": categories[18].data[3],
        },
        Traffic: {
            "Traffic handling [Teleport Score]": categories[19].data[1],
        },
    };

    // represents all elements
    var areaQualitiesMapped = [
        {
            //businss Freedom
            selector: $("#businessFreedom"),
            value: `Business Freedom - ${
                categories[0].data[0]?.float_value?.toFixed(2) || "unknown"
            }`,
        },
        {
            selector: $("#corruptionFreedom"),
            value: `Corruption Freedom - ${
                categories[0].data[2]?.float_value?.toFixed(2) || "Unknown"
            }`,
        },
        {
            selector: $("#laborRestrictions"),
            value: `Labor Restrictions - ${
                categories[0].data[4]?.float_value?.toFixed(2) || "Unknown"
            }`,
        },
        {
            //city size
            selector: $("#cityCenterPopulationDensity"),
            value: `City Center Population Density - ${
                categories[1].data[2]?.float_value?.toFixed(2) || "Unknown"
            }`,
        },
        {
            selector: $("#UAPopulationDensity"),
            value: `UA Population Density - ${
                categories[1].data[1]?.float_value?.toFixed(2) || "Unknown"
            }`,
        },
        {
            selector: $("#UAPopulationSize"),
            value: `UA Population Size - ${
                categories[1].data[0]?.float_value?.toFixed(2) || "Unknown"
            }`,
        },
        {
            //cost of housing
            selector: $("#apartmentRentForLargeApartment"),
            value: `Apartment Rent for Large Apartment - $${
                categories[8].data[0]?.currency_dollar_value || "Unknown"
            }`,
        },
        {
            selector: $("#apartmentRentForMediumApartment"),
            value: `Apartment Rent for Medium Apartment - $${
                categories[8].data[1]?.currency_dollar_value || "Unknown"
            }`,
        },
        {
            selector: $("#apartmentRentForSmallApartment"),
            value: `Apartment Rent for Small Apartment - $${
                categories[8].data[2]?.currency_dollar_value || "Unknown"
            }`,
        },
        {
            selector: $("#rentIndexTelescore"),
            value: `Rent Index Telescore - ${
                categories[8].data[3]?.float_value || "Unknown"
            }`,
        },
        {
            //cost of living
            selector: $("#consumerPriceIndex"),
            value: `Consumer Price Index - ${
                categories[3].data[0]?.float_value?.toFixed(2) || "Unknown"
            }`,
        },
        {
            selector: $("#costOfPublicTransport"),
            value: `Cost of Public Transport - ${
                categories[3].data[7]?.currency_dollar_value || "Unknown"
            }`,
        },
        {
            selector: $("#costOfRestaurantMeal"),
            value: `Cost of Restaurant Meal - ${
                categories[3].data[8]?.currency_dollar_value || "Unknown"
            }`,
        },
        {
            //economy
            selector: $("#GDPGrowthRate"),
            value: `GDP Growth Rate - ${
                categories[5].data[2]?.percent_value?.toFixed(3) || "Unknown"
            }`,
        },
        {
            selector: $("#GDPPerCapita"),
            value: `GDP Per Capita - ${
                categories[5].data[4]?.currency_dollar_value?.toFixed(2) ||
                "Unknown"
            }`,
        },
        {
            //education
            selector: $("#bestUniversity"),
            value: `Best University - ${
                categories[6].data[16]?.string_value || "Unknown"
            }`,
        },
        {
            selector: $("#bestUniversityRank"),
            value: `Best University Rank - ${
                categories[6].data[17]?.int_value || "Unknown"
            }`,
        },
        {
            selector: $("#pisaRanking"),
            value: `PISA Ranking - ${
                categories[6].data[11]?.int_value || "Unknown"
            }`,
        },
        {
            selector: $("#pisaRankingTelescore"),
            value: `PISA Ranking Telescore - ${
                categories[6].data[12]?.float_value?.toFixed(2) || "Unknown"
            }`,
        },
        {
            selector: $("#studentHappiness"),
            value: `Student Happiness Index - ${
                categories[6].data[0]?.percent_value?.toFixed(3) || "Unknown"
            }`,
        },
        {
            //health care
            selector: $("#Cost"),
            value: `Cost - ${
                categories[7].data[0]?.float_value?.toFixed(3) || "Unknown"
            }`,
        },
        {
            selector: $("#Quality"),
            value: `Quality - ${
                categories[7].data[2]?.float_value?.toFixed(3) || "Unknown"
            }`,
        },
        {
            //Pollution
            selector: $("#airPollution"),
            value: `Air Pollution - ${
                categories[15].data[0]?.float_value?.toFixed(2) || "Unknown"
            }`,
        },
        {
            selector: $("#cleanliness"),
            value: `Cleanliness - ${
                categories[15].data[1]?.float_value?.toFixed(2) || "Unknown"
            }`,
        },
        {
            selector: $("#waterQuality"),
            value: `Water Quality - ${
                categories[15].data[2]?.float_value?.toFixed(2) || "Unknown"
            }`,
        },
        {
            //Safety
            selector: $("#crimeRate"),
            value: `Crime Rate - ${
                categories[16].data[0]?.float_value?.toFixed(2) || "Unknown"
            }`,
        },
        {
            selector: $("#gunDeathScore"),
            value: `Gun Death Score - ${
                categories[16].data[2]?.float_value?.toFixed(2) || "Unknown"
            }`,
        },
        {
            selector: $("#gunOwnerShipScore"),
            value: `Gun Ownership Score - ${
                categories[16].data[4]?.float_value?.toFixed(2) || "Unknown"
            }`,
        },
        {
            //taxation
            selector: $("#incomeTax"),
            value: `Income Tax - ${
                categories[18].data[2]?.float_value?.toFixed(2) || "Unknown"
            }`,
        },
        {
            selector: $("#salesTax"),
            value: `Sales Tax - ${
                categories[18].data[3]?.percent_value?.toFixed(2) || "Unknown"
            }`,
        },
    ];
    return areaQualitiesMapped;
}

// user input error handling
function invalidUserInput() {
    var timeLeft = 2;
    $("#stateError").text(
        "There was an error retrieving data. Please check your entry for possible misspellings."
    );
    $("#stateError").removeClass("text-light").addClass("text-danger");
    var timeInterval = setInterval(function () {
        timeLeft--;
        if (timeLeft === -1) {
            clearInterval(timeInterval);
            $("#stateError").text(
                "Enter an Urban Area to retrieve it's statistics!"
            );
            $("#stateError").removeClass("text-danger").addClass("text-light");
        }
        return;
    }, 1000);
}

// shortcuts to urban data, urban salaries, list of all urban areas, city fetch apis
function urbanData(area) {
    return fetch(
        `https://api.teleport.org/api/urban_areas/slug:${area.toLowerCase()}/details`
    );
}

function urbanSalaries(area) {
    return fetch(
        `https://api.teleport.org/api/urban_areas/slug:${area.toLowerCase()}/salaries`
    );
}

function urbanAreasList() {
    return fetch("https://api.teleport.org/api/urban_areas/");
}

function callCity(search) {
    return fetch(`https://api.teleport.org/api/cities/?search=${search}`);
}

// AUDIO TESTING
// AUDIO TESTING
// AUDIO TESTING
// AUDIO TESTING
// AUDIO TESTING
// AUDIO TESTING
const speakerIcon = $("#speakerImg");
var i = 0;
var audioMarkers = {};

// if adding new mp3 files to 'music' folder, add the name of the file to 'musicFiles' array
var musicFiles = [
    "THE-WEEKND-Out-Of-Time",
    "LOGIC-Indica-Badu",
    "BRENT-FAIYAZ-Too-Fast",
    "JHENE-AIKO-Tryna-Smoke",
    "WOLFTYLA-All-Tinted",
    "CHILDISH-GAMBINO-Bonfire",
    "CHILDISH-GAMBINO-This-Is-America",
    "STEVE-LACY-Bad-Habit-Remix-LOL",
    "BOBBY-DARIN-Beyond-The-Sea",
    "ABC-Be-Near-Me",
];
// add a nested object with each key having the values [isPlaying, mp3_file_path]
// data structure format:
// audioMarkers = {
//     "music file name": [isPlaying, mp3_file_path]
// }
for (var i = 0; i < musicFiles.length; i++) {
    audioMarkers[musicFiles[i]] = [
        false,
        new Audio(`./assets/music/${musicFiles[i]}.mp3`),
    ];
}

// make 'i' global to display music # on page
i = 0;
// iterate through 'audioMarkers' object to retrieve key = "music file name"
for (var [key, value] of Object.entries(audioMarkers)) {
    // audio label
    $("#music1").append(
        `<p class='musicHeader'>Background Music #${i + 1}</p>`
    );
    // add audio button setting "music file name" to ID of button
    $("#music1").append(
        `<button title="${key
            .split("-")
            .join(" ")}" class='audioBtn' id='${key}'>Play</button>`
    );
    $("#music1").append(`<hr>`);
    i++;
}

// select all buttons & volume slider
const buttons = document.querySelectorAll(".audioBtn");
var volume = document.querySelector("#volume");

// give an event listener for each iterative button
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // when user clicks on any of the buttons, iterate through all music files
        for (var i = 0; i < musicFiles.length; i++) {
            // see if the button id matches any one of the music files
            if (musicFiles[i] == button.id) {
                // if so, check if the song is playing
                if (audioMarkers[button.id][0] == false) {
                    // if the song isn't playing, play the song on a loop
                    // and idicate that the song is playing
                    audioMarkers[button.id][1].play();
                    audioMarkers[button.id][0] = true;
                    audioMarkers[button.id][1].loop = true;
                    // change the text of that button and show the speaker icon
                    button.textContent = "Pause";
                    speakerIcon.css("display", "block");
                } else if (audioMarkers[button.id][0] == true) {
                    // if the song is playing, pause the song
                    // and idicate that the song is not playing
                    audioMarkers[button.id][1].pause();
                    audioMarkers[button.id][0] = false;
                    button.textContent = "Play";
                    speakerIcon.css("display", "none");
                }
            }
        }
    });

    // update the volume when the slider is moved
    volume.addEventListener("input", (e) => {
        for (var i = 0; i < musicFiles.length; i++) {
            audioMarkers[button.id][1].volume = e.currentTarget.value / 100;
        }
    });
});