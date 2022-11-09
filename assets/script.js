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
            // follows 'data to use' list on group doc
            var areaQualities = [];
            for (var i = 0; i < data.categories.length; i++) {
                var category = {
                    "Business Freedom": {
                        "Buisness Freedom": 2,
                        "Corruption Freedom": 3,
                        "Labor Restrictions": 44,
                    }, // TODO: Add the rest of the categories from group doc
                    // 11 MORE CATEGORIES
                };
                console.log(category);
            }
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
