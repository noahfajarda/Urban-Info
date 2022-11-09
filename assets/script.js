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
        console.log("Array of Urban Areas: ", urbanAreaNameList);
    });

// retrieves all salaries from all occupations of city
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

function retrieveCategoryData(data) {
    // DELETE PLACEHOLDER LATER
    var placeholder = 0;
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
