function callCity(search) {
    return fetch(`https://api.teleport.org/api/cities/?search=${search}`)
}

callCity()
.then(response => response.json())
.then(data => {
    console.log(data)
})
console.log("test")