var searchEl = document.querySelector(".poke-name");
var formEl = document.querySelector(".pokemon");
var displayEl = document.querySelector(".pokemon-display");
var weatherDisplayEl = document.querySelector(".weather-display");
var lat;
var long;
//change config.weatherKey to personal open weather API key to get it to work
//var weatherAPI = config.weatherKey;
var weatherAPI = "2f0aa3eeabaa9f5d0f299426c008697b";

//get geo location of user
navigator.geolocation.getCurrentPosition(function(pos){  
    console.log(pos.coords.latitude);
    console.log(pos.coords.longitude);
    lat = pos.coords.latitude;
    long = pos.coords.longitude;


    var requestWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + weatherAPI;
    fetch(requestWeatherUrl)
    .then(function(response){
        return response.json();

    })
    .then(function(data){
        weatherDisplayEl.textContent = "";
        var weather = document.createElement('p');
        weather.textContent = "The Weather in " + data.name + " is " + data.weather[0].main;
        weatherDisplayEl.append(weather);


    })
    .catch(function (error){
        console.log(error);
    });

    }, function(){
        console.log("enable location");
        weatherDisplayEl.textContent = "";
        var weather = document.createElement('p');
        weather.textContent = "Please enable location services to experience the full pokemon experience";
        weatherDisplayEl.append(weather);
    });

//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}






formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    var pokemonName = searchEl.value.trim();
    pokemonName = pokemonName.toLowerCase()
    console.log(pokemonName);

    var requestUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokemonName;
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayEl.textContent = "";
            console.log(data);
            console.log(data.name);
            console.log(data.height);
            console.log(data.weight);
            console.log(data.sprites.front_default);
            var name = document.createElement("h2");
            name.textContent=data.name;
            var img = document.createElement("img");
            img.setAttribute("src",data.sprites.versions["generation-v"]["black-white"].animated.front_default);
            // img.setAttribute("src",data.sprites.front_default);
            var height = document.createElement("p");
            height.textContent = "Height: " + data.height;
            var weight = document.createElement("p");
            weight.textContent = "Weight: " + data.weight;
            var type = document.createElement("p");
            type.textContent = "Type: " + data.types[0].type.name;

            displayEl.append(name);
            displayEl.append(img);
            displayEl.append(height);
            displayEl.append(weight);
            displayEl.append(type);


        })
        .catch(function (error) {
            console.log(error);

        })

});
// creating a value of the team with teamArr
var teamArr = [];
var team = document.querySelector(".team");
var storedTeam = localStorage.getItem('team');
// check if pokemonCount in local storage is empty
if (JSON.parse(localStorage.getItem("team")) === null) {
    var pokemonCount = 1;
} else {
    var pokemonCount = JSON.parse(localStorage.getItem("team")).length;
} 
console.log(pokemonCount)
// // console.log("your team is " + pokemonCount);

// if(pokemonCount.length >=6){
//     this.setState({isFull: true});
// } 


if (storedTeam != null) {
 // changing the value of teamArr in to a string
    teamArr = JSON.parse(storedTeam);
} 
function deleteFromTeam(key) {
    // removing item from array by one
    //pokemonCounter--;
    teamArr.splice(Number(key),1);
    
    updateTeam();

51
}
addB = document.querySelector(".addBtn")

function updateTeam() {
    team.innerHTML = "";
    
    for (const key of teamArr) {
        
        var teamName = document.createElement("li");
        var deleteBtn = document.createElement("button")
        var teamImg = document.createElement("img");
        teamImg.src = key[1];
       
        deleteBtn.addEventListener("click", e => {
            var el = e.target;
            if (el.classList.contains("delete")) {
                deleteFromTeam(el.getAttribute("key"));
            }
        })

        teamName.textContent = key[0];
        deleteBtn.textContent = "delete";
        deleteBtn.setAttribute("key", key[0]);
        deleteBtn.classList.add("delete");
    
        teamName.appendChild(deleteBtn);
        team.appendChild(teamName);
        team.appendChild(teamImg);
    }
    localStorage.setItem('team', JSON.stringify(teamArr));
    if (teamArr == "") {
        localStorage.removeItem("team");
    }
}

updateTeam()

addB.addEventListener('click', function (event) {
    event.preventDefault();
    //if (pokemonCount <=6)
    pokemonCounter++;
   // else error message
    var teamLimit = 6;
    var exceedsLimit = false;
    console.log(pokemonCount >= teamLimit);
    if (pokemonCount >= teamLimit){
        exceedsLimit = true;
        console.log("limit exceeded")
        return 0
    } else {
        var name = document.querySelector("h2")
        var teamImg = document.querySelector("img").src;
    
        teamArr.push([name.textContent, teamImg]);
    
        updateTeam()
    }
    
    

    

});

// This is a way to get an array of objects of the first 151 pokemon with their name and their type
// var pokemonArr = [];
// for (var i = 1; i <=151;i++){

//     var requesArrtUrl = 'https://pokeapi.co/api/v2/pokemon/' + i;

//     fetch(requesArrtUrl)
//     .then(function(response){
//         return response.json();

//     }).then(function(data) {
        
//         console.log(data.name);
//         console.log(data.types[0].type.name);
//         var poketype = {name:data.name,type:data.types[0].type.name};
//         pokemonArr.push(poketype);
    
//     }).catch(function(error){
//         console.log(error);
//     });
    

// }
// console.log(pokemonArr);
