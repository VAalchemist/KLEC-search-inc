var searchEl = document.querySelector(".poke-name");
var formEl = document.querySelector(".pokemon");
var displayEl = document.querySelector(".pokemon-display");
var weatherDisplayEl = document.querySelector(".weather-display");
var lat;
var long;
var weatherAPI = config.weatherKey;

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
            img.setAttribute("src",data.sprites.front_default);
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
