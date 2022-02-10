var searchEl = document.querySelector(".poke-name");
var formEl = document.querySelector(".pokemon");
var displayEl = document.querySelector(".pokemon-display");
var weatherDisplayEl = document.querySelector(".weather-display");
var weatherDisplayP = document.querySelector(".weather-catch");

var lat;
var long;
var temp;
var isDay;
var forecast;
var windSpeed;



//get geo location of user
navigator.geolocation.getCurrentPosition(function(pos){  
    console.log(pos.coords.latitude);
    console.log(pos.coords.longitude);
    lat = pos.coords.latitude;
    long = pos.coords.longitude;

        //use the lat and long variables to create a url to use the weather API and fetching
        var requestWeatherGridUrl = "https://api.weather.gov/points/" + lat + "," + long;
        fetch(requestWeatherGridUrl)

    .then(function(response){
        return response.json();

    })
    .then(function(data){
        console.log(data);
        console.log(data.properties.gridX);
        console.log(data.properties.gridY);
        console.log(data.properties.relativeLocation.properties.city);
        console.log(data.properties.gridId);

        //assign grid values to use in API call
        var gridX = data.properties.gridX;
        var gridY = data.properties.gridY;
        var gridLocation = data.properties.gridId;

        //set up URL string for API call
        var requestWeatherForecastUrl = "https://api.weather.gov/gridpoints/" + gridLocation + "/" + gridX + "," + gridY + "/forecast";
        console.log(requestWeatherForecastUrl);

        fetch(requestWeatherForecastUrl)
        
        .then(function (weatherResponse){
            return weatherResponse.json();

        }).
        then(function(weatherData){

            console.log(weatherData);
            console.log(weatherData.properties.periods[0].shortForecast);


            //clearing out any previous content that may be in the weatherDisplay area of html
            weatherDisplayEl.textContent = "";
            //creating a new 'p' element to house the weather info
            var weather = document.createElement('p');
            //setting the weather content to be in the 'p' element created above
            weather.textContent = "The Weather in " + data.properties.relativeLocation.properties.city + " is " + weatherData.properties.periods[0].shortForecast;
            //appending the content 'p' element to the weatherDisplay element in the html
            weatherDisplayEl.append(weather);
            temp = weatherData.properties.periods[0].temperature;
            isDay = weatherData.properties.periods[0].isDaytime;
            forecast = weatherData.properties.periods[0].shortForecast.toLowerCase();
            windSpeed = weatherData.properties.periods[0].windSpeed.split(' ')[0];

            
        }).catch(function(weatherError) {
            console.log(weatherError);
        });

    });

});

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

            //only allows the first 151 pokemon
            if(data.id>151){
                displayEl.textContent = "";
                var errorMessage = document.createElement('p');
                errorMessage.textContent = "Please enter only GEN 1 pokemon";
                displayEl.append(errorMessage);


            }

            else {
                displayEl.textContent = "";
    
                var name = document.createElement("h2");
                name.textContent=data.name;
                var img = document.createElement("img");
                img.setAttribute("src",data.sprites.versions["generation-v"]["black-white"].animated.front_default);
                console.log(data.sprites.versions["generation-v"]["black-white"].animated.front_default);
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
                if(temp >= 80 && data.types[0].type.name ==="fire"){
                    weatherDisplayP.textContent = "This Pokemon loves the " + temp +" degree weather in your area";
                    console.log("this can be caught in " + temp +" degree weather");

                }

                else if (temp <= 40 && data.types[0].type.name ==="ice"){
                    weatherDisplayP.textContent = "This Pokemon loves the " + temp +" degree weather in your area";
                    console.log("this can be caught in " + temp +" degree weather");
                }

                else if (!isDay && data.types[0].type.name ==="ghost"){
                    weatherDisplayP.textContent = "This Pokemon loves the darkness in your area";
                    console.log("this can be caught in the dark");
                }
                else if (parseInt(windSpeed) >=5 && data.types[0].type.name ==="dragon"){
                    weatherDisplayP.textContent = "This Pokemon loves the " + windSpeed + " MPH winds in your area";
                    console.log("this can be caught in the dark");
                }
                else if (forecast.includes("sunny") && (data.types[0].type.name ==="bug" || data.types[0].type.name ==="grass")){
                    weatherDisplayP.textContent = "This Pokemon loves the sunshine in your area";
                    console.log("this can be caught in the sun");
                }
                else if (forecast.includes("clear sk") && (data.types[0].type.name ==="normal" || data.types[0].type.name ==="electric" || data.types[0].type.name ==="poison" || data.types[0].type.name ==="ground" || data.types[0].type.name ==="fairy" || data.types[0].type.name ==="fighting" || data.types[0].type.name ==="psychic" || data.types[0].type.name ==="rock")){
                    weatherDisplayP.textContent = "This Pokemon loves the clear skies in your area";
                    console.log("this can be caught in the sun");
                }

                else {
                    weatherDisplayP.textContent = "This Pokemon is not near you based on your weather";
                    console.log("this can't be caught");
                }
                




            }



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
    var pokemonCount = 0;
} else {
    var pokemonCount = JSON.parse(localStorage.getItem("team")).length;
} 
console.log(pokemonCount);
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
                pokemonCount--;
                
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

   // else error message
    var teamLimit = 6;
    var exceedsLimit = false;
    console.log(pokemonCount);
    if (pokemonCount >= teamLimit){
        exceedsLimit = true;
        console.log("limit exceeded")
        return 0
    } 

    
    else {
        
        var name = document.querySelector("h2")
        var teamImg = document.querySelector("img").src;
    
        teamArr.push([name.textContent, teamImg]);
        pokemonCount++;
    
        updateTeam()
    }

});

//retrieve trainername from local storage and print on screen
var trainer = JSON.parse(localStorage.getItem('train'));
document.querySelector('.trainerName').innerHTML = trainer + "'s " + "pokedex";
