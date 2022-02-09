var pokeListEl = document.querySelector(".poke-list");
var pokeMap = new Map();

var pokeListURL = "https://pokeapi.co/api/v2/pokemon/?limit=151";
fetch (pokeListURL)
.then(function(response){
    return response.json();


})

.then(function(data){
    console.log(data.results);

    for (var i = 0; i < data.results.length; i++) {

        var pokeURL = data.results[i].url;

        fetch(pokeURL)

        
        .then(function (pokeResponse){
            return pokeResponse.json();

        })
        
        .then(function (pokeData){

            if(pokeMap.has(pokeData.types[0].type.name)){  
                pokeMap.set(pokeData.types[0].type.name, pokeMap.get(pokeData.types[0].type.name)+1)

            }

            else {
                pokeMap.set(pokeData.types[0].type.name, 1 )

            }

            var cardContainer = document.createElement("div");
            cardContainer.setAttribute("class", "mt-4 sm:px-4 lg:px-16");
            cardContainer.setAttribute("style", "width: 300px");
            var contentContainer = document.createElement("div");
            contentContainer.setAttribute("class" , "bg-white h-full p-8 border-b-4 border-red-900 rounded-lg flex flex-col items-center sm:mx-2 sm:p-3 md:p-8")
            var imgContainer = document.createElement("div");
            imgContainer.setAttribute("class", "bg-gray-200 text-green-700  w-16 rounded-full p-2");
            imgContainer.setAttribute("style", "width: 100px; height:100px; text-align:center");
    
            var title = document.createElement("div");
            title.setAttribute("class", "mt-4 font-bold");
            title.textContent = pokeData.name;
            var img = document.createElement("img");
            img.setAttribute("src",pokeData.sprites.versions["generation-v"]["black-white"].animated.front_default);
            img.setAttribute("style","height:70px");
            imgContainer.append(img);
            contentContainer.append(imgContainer);
            contentContainer.append(title);
            cardContainer.append(contentContainer);
            pokeListEl.append(cardContainer);
            console.log(pokeMap);

        })
        
        .catch(function(pokeError){
            console.log(pokeError);

        })

        




    }

})

.catch(function (error) {
    console.log(error);

});
