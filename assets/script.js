// utility function to dynamically create and append elements
function createEl(element, innerHTML, id = "", classes = "") {
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
    document.body.appendChild(element);
}

createEl("nav", "<h2>Is My City Cool?</h2>", ["class1", "class2"]);
createEl("aside", "<aside>Is My City Cool?</aside>");

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

// upon pressing enter in Logan's input box, it retrieves the data
var userInput = $("#myInput");
userInput.on("keyup", function (event) {
    // different actions depending on searchBarID
    // when user presses enter:
    if (event.key === "Enter") {
        // search for urban area upon enter
        searchUrbanAreas(event.target.value);
        addUrbanButton(event.target.value);
    }
});

var urbanAreasHistory = [];
// retrieve data upon clicking submit button too
var submitBtn = $("#submitBtn");
submitBtn.on("click", function (event) {
    var userInput = document.getElementById("myInput").value;
    searchUrbanAreas(userInput);
    addUrbanButton(userInput);
});

function addUrbanButton(userInput) {
    if (!urbanAreasHistory.includes(userInput)) {
        // add the urban area to history array if non-existant
        urbanAreasHistory.push(userInput);
        // prettier-ignore
        createEl("button", userInput, (id = userInput), (classes = "urbanArea"));
    } else {
        console.log("NOT ADDED:", urbanAreasHistory);
    }
    console.log(urbanAreasHistory);
}

// prettier-ignore
var urbanAreas = ["Aarhus", "Adelaide", "Albuquerque", "Almaty", "Amsterdam", "Anchorage", "Ankara", "Asheville", "Asuncion", "Athens", "Atlanta", "Auckland", "Austin", "Baku", "Bali", "Bangkok", "Barcelona", "Beijing", "Beirut", "Belfast", "Belgrade", "Belize City", "Bengaluru", "Berlin", "Bern", "Birmingham", "Birmingham, AL", "Bogota", "Boise", "Bologna", "Bordeaux", "Boston", "Boulder", "Bozeman", "Bratislava", "Brisbane", "Bristol", "Brussels", "Bucharest", "Budapest", "Buenos Aires", "Buffalo", "Cairo", "Calgary", "Cambridge", "Cape Town", "Caracas", "Cardiff", "Casablanca", "Charleston", "Charlotte", "Chattanooga","Chennai", "Chiang Mai", "Chicago", "Chisinau", "Christchurch", "Cincinnati", "Cleveland", "Cluj-Napoca", "Cologne", "Colorado Springs", "Columbus", "Copenhagen", "Cork", "Curitiba", "Dallas", "Dar es Salaam", "Delhi", "Denver", "Des Moines", "Detroit", "Doha", "Dresden", "Dubai", "Dublin", "Dusseldorf", "Edinburgh", "Edmonton", "Eindhoven", "Eugene", "Florence", "Florianopolis", "Fort Collins", "Frankfurt", "Fukuoka", "Galway", "Gdansk", "Geneva", "Glasgow", "Gothenburg", "Grenoble", "Guadalajara", "Guatemala City", "Halifax", "Hamburg", "Hannover", "Havana", "Helsinki", "Ho Chi Minh City", "Hong Kong", "Honolulu", "Houston", "Hyderabad", "Indianapolis", "Innsbruck", "Istanbul", "Jacksonville", "Jakarta", "Johannesburg", "Kansas City", "Karlsruhe", "Kathmandu", "Kiev", "Kingston", "Knoxville", "Krakow", "Kuala Lumpur", "Lagos", "La Paz", "Las Palmas de Gran Canaria", "Las Vegas", "Lausanne", "Leipzig", "Lille", "Lima", "Lisbon", "Liverpool", "Ljubljana", "London", "Los Angeles", "Louisville", "Luxembourg", "Lviv", "Lyon", "Madison", "Madrid", "Malaga", "Malmo", "Managua", "Manchester", "Manila", "Marseille", "Medellin", "Melbourne", "Memphis", "Mexico City", "Miami", "Milan", "Milwaukee", "Minneapolis-Saint Paul", "Minsk", "Montevideo", "Montreal", "Moscow", "Mumbai", "Munich", "Nairobi", "Nantes", "Naples", "Nashville", "New Orleans", "New York", "Nice", "Nicosia", "Oklahoma City", "Omaha", "Orlando", "Osaka", "Oslo", "Ottawa", "Oulu", "Oxford", "Palo Alto", "Panama", "Paris", "Perth", "Philadelphia", "Phnom Penh", "Phoenix", "Phuket", "Pittsburgh", "Portland, ME", "Portland, OR", "Porto", "Porto Alegre", "Prague", "Providence", "Quito", "Raleigh", "Reykjavik", "Richmond", "Riga", "Rio De Janeiro", "Riyadh", "Rochester", "Rome", "Rotterdam", "Saint Petersburg", "Salt Lake City", "San Antonio", "San Diego", "San Francisco Bay Area", "San Jose", "San Juan", "San Luis Obispo", "San Salvador", "Santiago", "Santo Domingo", "Sao Paulo", "Sarajevo", "Saskatoon", "Seattle", "Seoul", "Seville", "Shanghai", "Singapore", "Skopje", "Sofia", "St. Louis", "Stockholm", "Stuttgart", "Sydney", "Taipei", "Tallinn", "Tampa Bay Area", "Tampere", "Tartu", "Tashkent", "Tbilisi", "Tehran", "Tel Aviv", "The Hague", "Thessaloniki", "Tokyo", "Toronto", "Toulouse", "Tunis", "Turin", "Turku", "Uppsala", "Utrecht", "Valencia", "Valletta", "Vancouver", "Victoria", "Vienna", "Vilnius", "Warsaw", "Washington, D.C.", "Wellington", "Winnipeg", "Wroclaw", "Yerevan", "Zagreb", "Zurich"];

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

// search urban areas
function searchUrbanAreas(urbanArea) {
    urbanArea = urbanArea.replaceAll(" ", "-");
    console.log(urbanArea);
    urbanData(urbanArea)
        .then((response) => response.json())
        .then((data) => {
            // console.log("Details:", data);
            var areaQualities = retrieveCategoryData(data);
            console.log("Area Qualities:", areaQualities);
            // structure of Area Qualities array:
            // [{"Category": {"SubCategory": "", "SubCategory": "", ...}},
            // {"Category": {"SubCategory": "", "SubCategory": "", ...}},
            // ...]
        });

    // retrieved salary data of urban area
    urbanSalaries(urbanArea)
        .then((response) => response.json())
        .then((data) => {
            // data == salary data
            // retrieveSalaries polishes/simplifies data
            var SalaryData = retrieveSalaries(data);
            console.log("Salary Data Array: ", SalaryData);
            // structure of Salary Data array:
            // [{Job Title: "", Salaries: [25th_Percentile, 50th_Percentile, 75th_Percentile]},...]
        });
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
    return areaQualities;
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
