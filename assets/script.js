var userInput = document.createElement("input")
document.body.appendChild(userInput)
userInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        searchCity(event.target.value)
    } 
})

function callCity(search) {
    return fetch(`https://api.teleport.org/api/cities/?search=${search}`)
}
function searchCity(city) {
    callCity(city)
    .then(response => response.json())
    .then(data => {
    console.log(data)
    })
}
console.log("test")