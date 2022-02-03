var searchEl = document.querySelector(".poke-name");
var formEl = document.querySelector(".pokemon");
var displayEl = document.querySelector(".pokemon-display");
var weatherDisplayEl = document.querySelector(".weather-display");
var lat;
var long;
//change config.weatherKey to personal open weather API key to get it to work
var weatherAPI = config.weatherKey;


//get geo location of user
navigator.geolocation.getCurrentPosition(function(pos){  

    //console.log the lat and long for testing
    console.log(pos.coords.latitude);
    console.log(pos.coords.longitude);

    //assign the lat and long values from the geolocation API to respective variables
    lat = pos.coords.latitude;
    long = pos.coords.longitude;

    //use the lat and long variables to create a url to use the openweather API and fetching
    var requestWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + weatherAPI;
    fetch(requestWeatherUrl)
    //formatting the reponse from the weather API into json format
    .then(function(response){
        return response.json();

    })
    //setting the json respone into a data object to use its properties
    .then(function(data){
        //clearing out any previous content that may be in the weatherDisplay area of html
        weatherDisplayEl.textContent = "";
        //creating a new 'p' element to house the weather info
        var weather = document.createElement('p');
        //setting the weather content to be in the 'p' element created above
        weather.textContent = "The Weather in " + data.name + " is " + data.weather[0].main;
        //appending the content 'p' element to the weatherDisplay element in the html
        weatherDisplayEl.append(weather);


    })
    //this is an error catch in case the weather API does not fetch anything
    .catch(function (error){
        console.log(error);
    });

    }, 
    //this is a function for the geoLocation API incase the user declines to share their location
    function(){ 
        console.log("enable location");
        weatherDisplayEl.textContent = "";
        var weather = document.createElement('p');
        weather.textContent = "Please enable location services to experience the full pokemon experience";
        weatherDisplayEl.append(weather);
    });

//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}





//listener for when the user searches for a pokemon
formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    //grabs the value from the form and sets it to a pokemonName variable
    var pokemonName = searchEl.value.trim();
    //sets the pokemonName variable to be all lower case
    pokemonName = pokemonName.toLowerCase()
    console.log(pokemonName);

    //uses the pokemonName variable to create a url for the pokemon API
    var requestUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokemonName;
    fetch(requestUrl)
    //formatting the reponse from the weather API into json format
        .then(function (response) {
            return response.json();
        })
        //setting the json respone into a data object to use its properties
        .then(function (data) {
            //clearing out any previous content that may be in the pokemonDisplay area of html
            displayEl.textContent = "";
            //console.log data from the response for testing
            console.log(data);
            console.log(data.name);
            console.log(data.height);
            console.log(data.weight);
            console.log(data.sprites.front_default);

            //creates various elements to store corresponding data from pokemon API
            var name = document.createElement("h2");
            name.textContent=data.name;
            var img = document.createElement("img");
            img.setAttribute("src",data.sprites.front_default);
            var height = document.createElement("p");
            height.textContent = "Height: " + data.height;
            var weight = document.createElement("p");
            weight.textContent = "Weight: " + data.weight;
            var type = document.createElement("p");
            type.textContent = "Type: " + data.types[0].type.name;

            //appending all of the created elements into the display pokemon area
            displayEl.append(name);
            displayEl.append(img);
            displayEl.append(height);
            displayEl.append(weight);
            displayEl.append(type);


        })
        //this is an error catch in case the pokemon API does not fetch anything
        .catch(function (error) {
            console.log(error);

        })

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
